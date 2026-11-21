const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const KITS = {
  starter: { name: "Starter Kit", price: 599, seekers: 1, desc: "One Seeker Hub, one Tag, one Action Taker — essential coverage for apartments." },
  home: { name: "Home Kit", price: 899, seekers: 3, desc: "Hub + 2 Nodes for full indoor mesh, Tag, Action Taker — seamless room-to-room handoff." },
  estate: { name: "Estate Kit", price: 1349, seekers: 6, desc: "Hub + 3 Nodes + 2 Fields for indoor + garden + driveway, Tag, Action Taker — complete perimeter." }
};

const ADDONS = {
  "seeker-node": { name: "Seeker Node", price: 119 },
  "seeker-field": { name: "Seeker Field", price: 189 },
  "seeker-tag": { name: "Seeker Tag", price: 79 }
};

const money = (n) => "$" + Number(n).toLocaleString("en-US");

$("#year").textContent = new Date().getFullYear();

const nav = $("#nav");
const navToggle = $("#navToggle");
const mobileMenu = $("#mobileMenu");

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

navToggle.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  navToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  mobileMenu.hidden = open;
});

$$("#mobileMenu a").forEach((a) => {
  a.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900 && !mobileMenu.hidden) {
    mobileMenu.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = $$(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

const canvas = $("#meshCanvas");
const ctx = canvas.getContext("2d");
let cw = 0;
let ch = 0;
let dpr = 1;
let trail = [];

const NODES = [
  { id: "hub", x: 0.20, y: 0.30, type: "seeker", label: "S-01" },
  { id: "node1", x: 0.40, y: 0.20, type: "seeker", label: "S-02" },
  { id: "node2", x: 0.60, y: 0.25, type: "seeker", label: "S-03" },
  { id: "field1", x: 0.15, y: 0.55, type: "seeker", label: "S-04" },
  { id: "field2", x: 0.85, y: 0.45, type: "seeker", label: "S-05" },
  { id: "tag", x: 0.50, y: 0.55, type: "tag", label: "NALA" },
  { id: "action-taker", x: 0.50, y: 0.80, type: "taker", label: "AT" }
];

const dogPos = (t) => ({
  x: 0.5 + 0.23 * Math.sin(t * 0.23) + 0.07 * Math.sin(t * 0.61),
  y: 0.53 + 0.21 * Math.cos(t * 0.19) + 0.05 * Math.cos(t * 0.47)
});

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  cw = rect.width;
  ch = rect.height;
  canvas.width = Math.round(cw * dpr);
  canvas.height = Math.round(ch * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawGrid() {
  ctx.save();
  ctx.strokeStyle = "rgba(111,242,165,0.055)";
  ctx.lineWidth = 1;
  const step = cw / 9;
  for (let x = step; x < cw; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ch);
    ctx.stroke();
  }
  for (let y = step; y < ch; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(cw, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawZones() {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.09)";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  ctx.roundRect(cw * 0.08, ch * 0.1, cw * 0.42, ch * 0.48, 8);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(154,169,160,0.34)";
  ctx.font = '600 8px "Space Grotesk", sans-serif';
  ctx.fillText("HOUSE", cw * 0.1, ch * 0.155);
  ctx.fillText("GARDEN", cw * 0.1, ch * 0.68);
  ctx.restore();
}

function drawCoverage(t) {
  const seekers = NODES.filter((n) => n.type === "seeker");
  seekers.forEach((n, i) => {
    const x = n.x * cw;
    const y = n.y * ch;
    const r = Math.min(cw, ch) * 0.21;
    const pulse = 1 + Math.sin(t * 0.8 + i) * 0.015;
    ctx.beginPath();
    ctx.arc(x, y, r * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(111,242,165,0.13)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(47,191,114,0.045)";
    ctx.fill();
  });
}

function drawSightline(dog) {
  let best = null;
  let bestDist = Infinity;
  NODES.filter((n) => n.type === "seeker").forEach((n) => {
    const dx = n.x * cw - dog.x * cw;
    const dy = n.y * ch - dog.y * ch;
    const d = dx * dx + dy * dy;
    if (d < bestDist) { bestDist = d; best = n; }
  });
  if (!best) return;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(best.x * cw, best.y * ch);
  ctx.lineTo(dog.x * cw, dog.y * ch);
  ctx.strokeStyle = "rgba(111,242,165,0.32)";
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 5]);
  ctx.stroke();
  ctx.restore();
}

function drawRadar(t) {
  const hub = NODES.find(n => n.id === "hub");
  if (!hub) return;
  const hx = hub.x * cw;
  const hy = hub.y * ch;
  const angle = (t * 0.55) % (Math.PI * 2);
  const r = Math.hypot(cw, ch) * 0.7;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(hx, hy);
  ctx.arc(hx, hy, r, angle - 0.6, angle);
  ctx.closePath();
  const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, r);
  g.addColorStop(0, "rgba(111,242,165,0.16)");
  g.addColorStop(1, "rgba(111,242,165,0)");
  ctx.fillStyle = g;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(hx, hy);
  ctx.lineTo(hx + Math.cos(angle) * r, hy + Math.sin(angle) * r);
  ctx.strokeStyle = "rgba(111,242,165,0.3)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

function drawNodes(t) {
  NODES.forEach((n) => {
    const x = n.x * cw;
    const y = n.y * ch;
    let color = "111,242,165";
    if (n.type === "taker") color = "255,184,107";
    if (n.type === "tag") color = "255,255,255";
    const pulse = 1 + Math.sin(t * 2 + n.x * 10) * 0.12;
    ctx.beginPath();
    ctx.arc(x, y, 9 * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${color},0.22)`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 3.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color},0.95)`;
    ctx.shadowColor = `rgba(${color},0.85)`;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(154,169,160,0.62)";
    ctx.font = '600 8px "Space Grotesk", sans-serif';
    ctx.fillText(n.label, x + 9, y - 7);
  });
}

function drawDog(t, dog) {
  const x = dog.x * cw;
  const y = dog.y * ch;
  const ring = (t * 0.6) % 1;
  ctx.beginPath();
  ctx.arc(x, y, 6 + ring * 22, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255,255,255,${0.22 * (1 - ring)})`;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, 4.6, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(255,255,255,0.9)";
  ctx.shadowBlur = 14;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(233,240,234,0.85)";
  ctx.font = '600 9px "Space Grotesk", sans-serif';
  ctx.fillText("NALA", x + 10, y + 3);
}

function drawTrail() {
  if (trail.length < 2) return;
  ctx.save();
  for (let i = 1; i < trail.length; i++) {
    const a = trail[i - 1];
    const b = trail[i];
    ctx.beginPath();
    ctx.moveTo(a.x * cw, a.y * ch);
    ctx.lineTo(b.x * cw, b.y * ch);
    ctx.strokeStyle = `rgba(255,255,255,${0.12 * (i / trail.length)})`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }
  ctx.restore();
}

function drawFrame(t) {
  ctx.clearRect(0, 0, cw, ch);
  const dog = dogPos(t);
  trail.push(dog);
  if (trail.length > 26) trail.shift();
  drawGrid();
  drawZones();
  drawCoverage(t);
  drawTrail();
  drawRadar(t);
  drawSightline(dog);
  drawNodes(t);
  drawDog(t, dog);
}

let start = performance.now();
let raf = null;

function loop(now) {
  drawFrame((now - start) / 1000);
  raf = requestAnimationFrame(loop);
}

function initCanvas() {
  resizeCanvas();
  if (reducedMotion) {
    drawFrame(0);
  } else {
    start = performance.now();
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }
}

initCanvas();
let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initCanvas, 150);
});

const NODE_DATA = {
  hub: {
    kicker: "Seeker Hub · living room",
    title: "S-01 HUB",
    body: "Primary border router. 4K/30 · 170° · 60 GHz mmWave · 4-mic array. Thread border router for the mesh. Currently tracking Nala at position (3.2, 1.8) — resting on bed.",
    specs: [["Field of view", "170° · 4K/30"], ["Radar", "60 GHz mmWave"], ["Role", "Border router · arbiter"], ["Power", "12 V DC"]],
    foot: "Group behaviour → leads handoffs and arbitrates identity"
  },
  node1: {
    kicker: "Seeker Node · hallway",
    title: "S-02 NODE",
    body: "Plug-in unit covering the hallway and stairs. 2K · 120° · PIR + mmWave. Passes the dog to the next Seeker without a gap. 6 W power draw.",
    specs: [["Field of view", "120° · 2K"], ["Sensors", "PIR + mmWave"], ["Role", "Hallway & stairs"], ["Power", "Plug-in · 6 W"]],
    foot: "Group behaviour → overlaps Hub and bedroom Node"
  },
  node2: {
    kicker: "Seeker Node · bedroom",
    title: "S-03 NODE",
    body: "Covers the bedroom and adjacent bathroom. Watches doorways and quiet zones. Hands off to Hub when dog returns to living area.",
    specs: [["Field of view", "120° · 2K"], ["Sensors", "PIR + mmWave"], ["Role", "Bedroom coverage"], ["Power", "Plug-in · 6 W"]],
    foot: "Group behaviour → overlaps hallway Node"
  },
  field1: {
    kicker: "Seeker Field · garden",
    title: "S-04 FIELD",
    body: "Weatherproof garden unit. 2K · IP66 · IR 15 m · solar option · 60 GHz radar. Watches the back gate and lawn. First boundary alert.",
    specs: [["Rating", "IP66 · 2K"], ["Night vision", "IR 15 m"], ["Role", "Garden boundary"], ["Power", "Solar option"]],
    foot: "Group behaviour → raises the first outdoor alert"
  },
  field2: {
    kicker: "Seeker Field · driveway",
    title: "S-05 FIELD",
    body: "Covers the front approach and driveway. Detects movement toward the street. Triggers Action Taker boundary beep if dog approaches.",
    specs: [["Rating", "IP66 · 2K"], ["Night vision", "IR 15 m"], ["Role", "Driveway boundary"], ["Power", "Wired"]],
    foot: "Group behaviour → final boundary before road"
  },
  tag: {
    kicker: "Seeker Tag · on Nala",
    title: "NALA",
    body: "22 g collar tag with UWB + BLE + GPS. Gives every Seeker a shared reference for identity and position. Pulse sensor for pace. 7-day battery.",
    specs: [["Range", "UWB 60 m · GPS outdoor"], ["Battery", "7 days"], ["Weight", "22 g"], ["Sensors", "UWB + BLE + GPS + pulse"]],
    foot: "Group behaviour → identity anchor for all Seekers"
  },
  "action-taker": {
    kicker: "Action Taker · engaged",
    title: "ACTION TAKER",
    body: "Single engagement hub: puzzle module (3 sliding panels + rotating wheel), ball roller, 4-slot scent cartridge, 3 W speaker, LED ring, 500-treat hopper. Thread + BLE. 2.8 kg weighted base.",
    specs: [["Puzzle", "3 panels + 8-position wheel"], ["Ball", "Roller 0.2–1.5 m/s"], ["Scent", "4-slot cartridge"], ["Sound", "3 W full-range"], ["Treats", "500 capacity · 1–5 g"]],
    foot: "Group behaviour → engages on mesh movement signal"
  }
};

const diagram = $("#diagram");
const panelKicker = $("#panelKicker");
const panelTitle = $("#panelTitle");
const panelBody = $("#panelBody");
const panelSpecs = $("#panelSpecs");
const panelFoot = $(".panel-foot");
const logText = $("#logText");
const logTime = $("#logTime");

const LEVEL_LOGS = {
  watch: "Watch level · Action Taker idle · Seeker mesh holds sight · coverage 96% · dog resting",
  puzzle: "Puzzle level · LED ring amber · scent puff released · panels armed · waiting for approach",
  play: "Play level · ball roller armed · IR zone active · unpredictable pattern queued",
  scent: "Scent level · cartridge 1 (bacon) primed · micro-pump ready · trail path set",
  sound: "Sound level · curiosity tone armed → fallback chirp → boundary beep sequence"
};

function selectNode(id) {
  const data = NODE_DATA[id];
  if (!data) return;
  $$(".node", diagram).forEach((n) => n.classList.toggle("is-active", n.dataset.node === id));
  panelKicker.textContent = data.kicker;
  panelTitle.textContent = data.title;
  panelBody.textContent = data.body;
  panelSpecs.innerHTML = data.specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  panelFoot.innerHTML = data.foot.replace("→", '<span class="arrow">→</span>');
}

$$(".node", diagram).forEach((node) => {
  node.addEventListener("click", () => selectNode(node.dataset.node));
});

function setLevel(level) {
  diagram.dataset.level = level;
  $$(".level-btn").forEach((btn) => {
    const active = btn.dataset.level === level;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  logText.textContent = LEVEL_LOGS[level];
}

$$(".level-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLevel(btn.dataset.level));
});

setLevel("watch");
selectNode("tag");

function tickClock() {
  logTime.textContent = new Date().toLocaleTimeString("en-GB", { hour12: false });
}
tickClock();
setInterval(tickClock, 1000);

const plannerForm = $("#plannerForm");
const roomsEl = $("#rooms");
const roomsOut = $("#roomsOut");
const resultKit = $("#resultKit");
const resultDesc = $("#resultDesc");
const resultList = $("#resultList");
const resultTotal = $("#resultTotal");
const plannerAdd = $("#plannerAdd");
let currentPlan = null;

function computePlan() {
  const rooms = Number(roomsEl.value);
  const outdoor = $('input[name="outdoor"]:checked', plannerForm).value;
  const dog = $('input[name="dog"]:checked', plannerForm).value;
  const engage = $('input[name="engage"]:checked', plannerForm).value;

  const indoorSeekers = Math.max(1, Math.ceil(rooms / 2));
  const outdoorUnits = outdoor === "garden" ? 1 : outdoor === "field" ? 2 : 0;
  const totalSeekers = indoorSeekers + outdoorUnits;

  let kitId = "starter";
  if (totalSeekers >= 5) kitId = "estate";
  else if (totalSeekers >= 3) kitId = "home";

  const kit = KITS[kitId];
  const extra = Math.max(0, totalSeekers - kit.seekers);

  const extras = [];
  const extraField = Math.min(extra, outdoorUnits);
  if (extraField > 0) extras.push({ id: "seeker-field", qty: extraField });
  if (extra - extraField > 0) extras.push({ id: "seeker-node", qty: extra - extraField });
  if (dog === "large") extras.push({ id: "seeker-tag", qty: 1 });

  const addonTotal = extras.reduce((sum, e) => sum + ADDONS[e.id].price * e.qty, 0);
  const total = kit.price + addonTotal;

  return { rooms, outdoor, dog, engage, totalSeekers, kitId, kit, extras, total };
}

function renderPlan() {
  const plan = computePlan();
  currentPlan = plan;
  roomsOut.textContent = plan.rooms;
  const fill = ((plan.rooms - 1) / 7) * 100;
  roomsEl.style.background = `linear-gradient(90deg, var(--green) ${fill}%, rgba(111,242,165,0.16) ${fill}%)`;
  resultKit.textContent = `${plan.kit.name} + Action Taker`;
  resultDesc.textContent = plan.kit.desc;

  const outdoorLabel = plan.outdoor === "garden" ? "garden" : plan.outdoor === "field" ? "large field" : "no outdoor space";
  const dogLabel = plan.dog.charAt(0).toUpperCase() + plan.dog.slice(1);
  const engageLabel = plan.engage.charAt(0).toUpperCase() + plan.engage.slice(1);
  const rows = [
    `<li><span>${plan.kit.name} (${plan.kit.seekers} Seekers) + Action Taker</span><span>${money(plan.kit.price)}</span></li>`,
    `<li><span>Coverage · ${plan.totalSeekers} Seekers for ${plan.rooms} room${plan.rooms > 1 ? "s" : ""}, ${outdoorLabel}</span><span>—</span></li>`,
    `<li><span>Dog size · ${dogLabel}</span><span>—</span></li>`,
    `<li><span>Engagement · ${engageLabel}</span><span>—</span></li>`
  ];
  plan.extras.forEach((e) => {
    rows.push(`<li><span>${ADDONS[e.id].name} × ${e.qty}</span><span>${money(ADDONS[e.id].price * e.qty)}</span></li>`);
  });
  if (!plan.extras.length) rows.push(`<li><span>No add-ons needed</span><span>—</span></li>`);
  resultList.innerHTML = rows.join("");
  resultTotal.textContent = money(plan.total);
}

plannerForm.addEventListener("input", renderPlan);
plannerForm.addEventListener("change", renderPlan);
renderPlan();

const kitSelect = $("#kit");
const qtyInput = $("#quantity");
const notesInput = $("#notes");
const addonChecks = $("#addonChecks");

function addonInputs() {
  return $$('input[type="checkbox"]', addonChecks);
}

function syncAddonState() {
  addonInputs().forEach((cb) => {
    const qty = cb.closest("label").querySelector(".addon-qty");
    qty.disabled = !cb.checked;
    if (!cb.checked) qty.value = "1";
  });
}

function selectedAddons() {
  return addonInputs()
    .filter((cb) => cb.checked)
    .map((cb) => {
      const qty = Number(cb.closest("label").querySelector(".addon-qty").value) || 1;
      return { id: cb.value, qty: Math.max(1, Math.min(5, qty)) };
    });
}

const sumKitName = $("#sumKitName");
const sumKitPrice = $("#sumKitPrice");
const sumAddons = $("#sumAddons");
const sumTotal = $("#sumTotal");

function renderSummary() {
  const kit = KITS[kitSelect.value];
  const qty = Math.max(1, Math.min(5, Number(qtyInput.value) || 1));
  const addons = selectedAddons();
  const addonTotal = addons.reduce((sum, a) => sum + ADDONS[a.id].price * a.qty, 0);
  const total = kit.price * qty + addonTotal;

  sumKitName.textContent = `${kit.name} × ${qty}`;
  sumKitPrice.textContent = money(kit.price * qty);
  sumAddons.innerHTML = addons
    .map((a) => `<li><span>${ADDONS[a.id].name} × ${a.qty}</span><em>${money(ADDONS[a.id].price * a.qty)}</em></li>`)
    .join("");
  sumAddons.hidden = addons.length === 0;
  sumTotal.textContent = money(total);
}

[kitSelect, qtyInput].forEach((el) => {
  el.addEventListener("input", renderSummary);
  el.addEventListener("change", renderSummary);
});

addonChecks.addEventListener("change", () => {
  syncAddonState();
  renderSummary();
});
addonChecks.addEventListener("input", renderSummary);
syncAddonState();
renderSummary();

function scrollToOrder() {
  $("#order").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

$$(".kit-pick").forEach((btn) => {
  btn.addEventListener("click", () => {
    kitSelect.value = btn.dataset.kit;
    addonInputs().forEach((cb) => { cb.checked = false; });
    syncAddonState();
    renderSummary();
    scrollToOrder();
    setTimeout(() => kitSelect.focus({ preventScroll: true }), reducedMotion ? 0 : 500);
  });
});

plannerAdd.addEventListener("click", () => {
  if (!currentPlan) return;
  kitSelect.value = currentPlan.kitId;
  addonInputs().forEach((cb) => { cb.checked = false; });
  currentPlan.extras.forEach((e) => {
    const cb = addonInputs().find((c) => c.value === e.id);
    if (!cb) return;
    cb.checked = true;
    cb.closest("label").querySelector(".addon-qty").value = String(e.qty);
  });
  const outdoorLabel = currentPlan.outdoor === "garden" ? "garden" : currentPlan.outdoor === "field" ? "large field" : "no outdoor";
  const dogLabel = currentPlan.dog.charAt(0).toUpperCase() + currentPlan.dog.slice(1);
  notesInput.value = `Planner: ${currentPlan.rooms} rooms · ${outdoorLabel} · ${currentPlan.dog} dog · ${currentPlan.totalSeekers} Seekers · ${currentPlan.engage} engagement`;
  syncAddonState();
  renderSummary();
  scrollToOrder();
  setTimeout(() => notesInput.focus({ preventScroll: true }), reducedMotion ? 0 : 500);
});

const orderForm = $("#orderForm");
const orderLayout = $(".order-layout");
const orderSuccess = $("#orderSuccess");
const formStatus = $("#formStatus");
const submitBtn = $("#submitBtn");

function setStatus(text, kind = "") {
  formStatus.textContent = text;
  formStatus.className = "form-status" + (kind ? " is-" + kind : "");
}

function renderSuccess(order) {
  $("#successId").textContent = order.id;
  $("#successBody").textContent = `We've received your reservation and sent a confirmation to ${order.customer.email}.`;
  const rows = [
    `<li><span>${order.kit.name} × ${order.kit.quantity}</span><em>${money(order.kit.unit_price * order.kit.quantity)}</em></li>`
  ];
  order.addons.forEach((a) => {
    rows.push(`<li><span>${a.name} × ${a.quantity}</span><em>${money(a.price * a.quantity)}</em></li>`);
  });
  $("#successList").innerHTML = rows.join("");
  $("#successTotal").textContent = money(order.total);
}

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    setStatus("Please fill in the required fields.", "error");
    return;
  }

  const payload = {
    name: $("#name").value.trim(),
    email: $("#email").value.trim(),
    kit: kitSelect.value,
    quantity: Number(qtyInput.value),
    addons: selectedAddons().map((a) => ({ id: a.id, quantity: a.qty })),
    dogName: $("#dogName").value.trim(),
    notes: notesInput.value.trim()
  };

  submitBtn.disabled = true;
  setStatus("Reserving your mesh…");

  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => null);

    if (!res.ok || !data || !data.ok) {
      const msg = data && data.error ? data.error : "Something went wrong. Please try again.";
      throw new Error(msg);
    }

    orderLayout.hidden = true;
    orderSuccess.hidden = false;
    setStatus("");
    renderSuccess(data.order);
    orderSuccess.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  } catch (err) {
    setStatus(err.message || "Something went wrong. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});

$("#anotherOrder").addEventListener("click", () => {
  orderSuccess.hidden = true;
  orderLayout.hidden = false;
  orderForm.reset();
  kitSelect.value = "home";
  addonInputs().forEach((cb) => { cb.checked = false; });
  syncAddonState();
  renderSummary();
  setStatus("");
  scrollToOrder();
});

// Demo video interactions
const video = $("#atVideo");
const videoOverlay = $("#videoOverlay");
const playBtn = $("#playBtn");
const chapterBtns = $$(".chapter-btn");

if (video) {
  playBtn.addEventListener("click", () => {
    video.play();
    videoOverlay.classList.add("hidden");
  });

  video.addEventListener("play", () => {
    videoOverlay.classList.add("hidden");
  });

  video.addEventListener("pause", () => {
    videoOverlay.classList.remove("hidden");
  });

  video.addEventListener("ended", () => {
    videoOverlay.classList.remove("hidden");
  });

  video.addEventListener("timeupdate", () => {
    const currentTime = video.currentTime;
    chapterBtns.forEach((btn) => {
      const chapterTime = Number(btn.dataset.time);
      const nextBtn = chapterBtns[chapterBtns.indexOf(btn) + 1];
      const nextTime = nextBtn ? Number(nextBtn.dataset.time) : Infinity;
      if (currentTime >= chapterTime && currentTime < nextTime) {
        btn.classList.add("is-active");
      } else {
        btn.classList.remove("is-active");
      }
    });
  });

  chapterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      video.currentTime = Number(btn.dataset.time);
      if (video.paused) video.play();
    });
  });
}