const fs = require("fs");

const KITS = {
  watch: { id: "watch", name: "Watch Kit", price: 349 },
  guide: { id: "guide", name: "Guide Kit", price: 649 },
  pack: { id: "pack", name: "Pack Kit", price: 1149 }
};

const ADDONS = {
  "seeker-node": { id: "seeker-node", name: "Seeker Node", price: 119 },
  "seeker-field": { id: "seeker-field", name: "Seeker Field", price: 189 },
  "taker-beacon": { id: "taker-beacon", name: "Taker Beacon", price: 149 },
  "taker-collar": { id: "taker-collar", name: "Taker Collar", price: 179 },
  "taker-gate": { id: "taker-gate", name: "Taker Gate", price: 249 },
  "taker-dispenser": { id: "taker-dispenser", name: "Taker Dispenser", price: 199 }
};

const STORE_FILE = "/tmp/shepherd-orders.json";
const orders = new Map();
const hits = new Map();
let loaded = false;

function loadOrders() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = fs.readFileSync(STORE_FILE, "utf8");
    const list = JSON.parse(raw);
    if (Array.isArray(list)) {
      list.forEach((o) => {
        if (o && o.id) orders.set(o.id, o);
      });
    }
  } catch (err) {
    loaded = true;
  }
}

function persistOrders() {
  try {
    const list = Array.from(orders.values()).slice(-500);
    fs.writeFileSync(STORE_FILE, JSON.stringify(list));
  } catch (err) {
    loaded = true;
  }
}

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload, null, 2));
}

function clean(value, max) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body !== undefined && req.body !== null && req.body !== "") {
      if (typeof req.body === "object") return resolve(req.body);
      try {
        return resolve(JSON.parse(req.body));
      } catch (err) {
        return reject(new Error("Request body is not valid JSON."));
      }
    }
    if (typeof req.on !== "function") return resolve({});
    let raw = "";
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 20000) {
        reject(new Error("Request body is too large."));
        req.destroy();
        return;
      }
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(new Error("Request body is not valid JSON."));
      }
    });
    req.on("error", reject);
  });
}

function rateLimited(ip) {
  const now = Date.now();
  const windowStart = now - 60000;
  const list = (hits.get(ip) || []).filter((t) => t > windowStart);
  if (list.length >= 30) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

function makeId() {
  const d = new Date();
  const y = String(d.getUTCFullYear()).slice(2);
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let tail = "";
  for (let i = 0; i < 4; i++) {
    tail += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `SHP-${y}${m}${day}-${tail}`;
}

function buildOrder(input) {
  const name = clean(input.name, 80);
  const email = clean(input.email, 160);
  const kitId = clean(input.kit, 20).toLowerCase();
  const dogName = clean(input.dogName, 40);
  const notes = clean(input.notes, 600);

  if (name.length < 2) return { error: "Please give a name of at least 2 characters." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { error: "Please provide a valid email address." };
  if (!KITS[kitId]) return { error: "Choose a kit: watch, guide or pack." };

  const quantity = Number(input.quantity === undefined ? 1 : input.quantity);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return { error: "Quantity must be a whole number between 1 and 10." };
  }

  const addonInput = input.addons === undefined ? [] : input.addons;
  if (!Array.isArray(addonInput)) return { error: "Add-ons must be a list." };
  if (addonInput.length > 6) return { error: "Too many add-on lines." };

  const merged = new Map();
  for (const item of addonInput) {
    const id = typeof item === "string" ? item : item && item.id;
    if (!ADDONS[id]) return { error: `Unknown add-on: ${String(id)}.` };
    const qty = Number(typeof item === "object" && item !== null && item.quantity !== undefined ? item.quantity : 1);
    if (!Number.isInteger(qty) || qty < 1 || qty > 9) {
      return { error: `Add-on quantity for ${ADDONS[id].name} must be between 1 and 9.` };
    }
    merged.set(id, (merged.get(id) || 0) + qty);
  }

  const addons = Array.from(merged.entries()).map(([id, qty]) => ({
    id,
    name: ADDONS[id].name,
    price: ADDONS[id].price,
    quantity: qty
  }));

  if (addons.some((a) => a.quantity > 9)) {
    return { error: "Each add-on is limited to 9 units per order." };
  }

  const kit = KITS[kitId];
  const kitTotal = kit.price * quantity;
  const addonTotal = addons.reduce((sum, a) => sum + a.price * a.quantity, 0);

  return {
    order: {
      id: makeId(),
      created_at: new Date().toISOString(),
      status: "received",
      customer: { name, email },
      kit: { id: kit.id, name: kit.name, unit_price: kit.price, quantity },
      addons,
      dog_name: dogName,
      notes,
      total: kitTotal + addonTotal,
      currency: "USD"
    }
  };
}

module.exports = async function handler(req, res) {
  cors(res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  loadOrders();

  if (req.method === "GET") {
    const url = new URL(req.url || "/", "http://localhost");
    const id = (req.query && req.query.id) || url.searchParams.get("id");
    if (id) {
      const order = orders.get(String(id).toUpperCase());
      if (!order) return send(res, 404, { ok: false, error: "No order found with that reference." });
      return send(res, 200, { ok: true, order });
    }
    return send(res, 200, {
      ok: true,
      service: "Shepherd order endpoint",
      version: "1.0",
      methods: ["GET", "POST"],
      kits: Object.values(KITS).map((k) => ({ id: k.id, name: k.name, price: k.price })),
      addons: Object.values(ADDONS).map((a) => ({ id: a.id, name: a.name, price: a.price })),
      usage: {
        create: "POST /api/order with JSON: { name, email, kit, quantity, addons: [{ id, quantity }], dogName, notes }",
        lookup: "GET /api/order?id=SHP-XXXXXX-XXXX"
      }
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    return send(res, 405, { ok: false, error: "Method not allowed. Use GET or POST." });
  }

  const ip = (req.headers && (req.headers["x-forwarded-for"] || "").split(",")[0].trim()) || "local";
  if (rateLimited(ip)) {
    return send(res, 429, { ok: false, error: "Too many requests. Please wait a moment and try again." });
  }

  let input;
  try {
    input = await readBody(req);
  } catch (err) {
    return send(res, 400, { ok: false, error: err.message });
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return send(res, 400, { ok: false, error: "Send a JSON object with your reservation details." });
  }

  const result = buildOrder(input);
  if (result.error) return send(res, 400, { ok: false, error: result.error });

  const order = result.order;
  orders.set(order.id, order);
  persistOrders();

  return send(res, 201, {
    ok: true,
    message: `Reservation received. Reference ${order.id}. No payment has been taken.`,
    order
  });
};
