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

// Preview simulation
const previewCanvas = $("#previewCanvas");
const previewCtx = previewCanvas ? previewCanvas.getContext("2d") : null;
let previewRaf = null;
let previewTime = 0;
let previewSpeed = 1;
let previewRunning = false;
let previewPaused = false;
let simState = "idle"; // idle, moving, boundary, sound, puzzle, solving, reward, autoSolve, ballPlay
let dogX = 0.3;
let dogY = 0.5;
let dogTargetX = 0.3;
let dogTargetY = 0.5;
let dogAngle = 0;
let puzzleProgress = 0;
let treatCount = 500;
let ballX = 0;
let ballY = 0;
let ballActive = false;
let ballAngle = 0;
let soundWaves = [];
let eventLog = [];
let timelineItems = [];

// Canvas dimensions (computed on resize)
let canvasW = 0;
let canvasH = 0;
let canvasCX = 0;
let canvasCY = 0;
let boundaryY = 0;
let atX = 0;
let atY = 0;

const previewElements = {
  status: $("#previewStatus"),
  hudDog: $("#hudDog"),
  hudState: $("#hudState"),
  hudGesture: $("#hudGesture"),
  hudAction: $("#hudAction"),
  hudProgress: $("#hudProgress"),
  hudTreats: $("#hudTreats"),
  log: $("#previewLog"),
  timeline: $("#timeline"),
  speedLabel: $("#speedLabel"),
  startBtn: $("#startSim"),
  pauseBtn: $("#pauseSim"),
  resetBtn: $("#resetSim"),
  triggerMove: $("#triggerMove"),
  triggerBoundary: $("#triggerBoundary"),
  triggerIgnore: $("#triggerIgnore"),
  triggerPlay: $("#triggerPlay"),
  speedInput: $("#simSpeed")
};

const SIM_EVENTS = [
  { id: "idle", label: "Idle — Dog resting", state: "idle" },
  { id: "move", label: "Dog starts moving", state: "moving" },
  { id: "boundary", label: "Dog approaches boundary", state: "boundary" },
  { id: "sound", label: "Sound attraction emitted", state: "sound" },
  { id: "puzzle", label: "Puzzle presented", state: "puzzle" },
  { id: "solving", label: "Dog solving puzzle", state: "solving" },
  { id: "reward", label: "Reward dispensed", state: "reward" },
  { id: "autoSolve", label: "Auto-solve triggered", state: "autoSolve" },
  { id: "ballPlay", label: "Ball play mode", state: "ballPlay" }
];

function addLog(event, detail = "") {
  const time = new Date().toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.innerHTML = `<span class="log-time">[${time}]</span><span class="log-event">${event}</span><span class="log-detail">${detail}</span>`;
  previewElements.log.appendChild(entry);
  previewElements.log.scrollTop = previewElements.log.scrollHeight;
  eventLog.push({ time, event, detail });
}

function updateTimeline(activeState) {
  if (!previewElements.timeline.children.length) {
    SIM_EVENTS.forEach((e, i) => {
      const item = document.createElement("div");
      item.className = "timeline-item";
      item.dataset.state = e.id;
      item.innerHTML = `<span class="timeline-dot"></span><span class="timeline-text">${e.label}</span>`;
      previewElements.timeline.appendChild(item);
    });
  }
  $$(".timeline-item", previewElements.timeline).forEach((item) => {
    const isActive = item.dataset.state === activeState;
    item.classList.toggle("active", isActive);
    if (isActive) item.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function setSimState(state) {
  simState = state;
  const stateLabels = {
    idle: "Resting",
    moving: "Moving",
    boundary: "At Boundary",
    sound: "Sound Emitted",
    puzzle: "Puzzle Active",
    solving: "Solving",
    reward: "Reward",
    autoSolve: "Auto-Solve",
    ballPlay: "Ball Play"
  };
  const actionLabels = {
    idle: "Idle",
    moving: "Tracking",
    boundary: "Alert",
    sound: "Emitting Sound",
    puzzle: "Puzzle Mode",
    solving: "Monitoring",
    reward: "Dispensing",
    autoSolve: "Auto-Solving",
    ballPlay: "Ball Mode"
  };
  const gestures = {
    idle: "Resting",
    moving: "Walking",
    boundary: "Boundary Approach",
    sound: "Orienting to Sound",
    puzzle: "Investigating",
    solving: "Manipulating",
    reward: "Consuming",
    autoSolve: "Waiting",
    ballPlay: "Chasing"
  };

  previewElements.hudState.textContent = stateLabels[state] || state;
  previewElements.hudAction.textContent = actionLabels[state] || state;
  previewElements.hudGesture.textContent = gestures[state] || "—";
  updateTimeline(state);
}

function logSim(event, detail) {
  addLog(event, detail);
}

function resizePreviewCanvas() {
  if (!previewCanvas) return;
  const rect = previewCanvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  previewCanvas.width = Math.round(rect.width * dpr);
  previewCanvas.height = Math.round(rect.height * dpr);
  previewCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Update global dimensions
  canvasW = rect.width;
  canvasH = rect.height;
  canvasCX = canvasW / 2;
  canvasCY = canvasH / 2;
  boundaryY = canvasH * 0.75;
  atX = canvasCX;
  atY = canvasH * 0.9;
}

function drawPreviewFrame() {
  if (!previewCanvas || !previewCtx) return;
  const w = canvasW;
  const h = canvasH;
  const cx = canvasCX;
  const cy = canvasCY;

  previewCtx.clearRect(0, 0, w, h);

  // Draw grid
  previewCtx.save();
  previewCtx.strokeStyle = "rgba(111,242,165,0.04)";
  previewCtx.lineWidth = 1;
  const step = 40;
  for (let x = 0; x < w; x += step) {
    previewCtx.beginPath();
    previewCtx.moveTo(x, 0);
    previewCtx.lineTo(x, h);
    previewCtx.stroke();
  }
  for (let y = 0; y < h; y += step) {
    previewCtx.beginPath();
    previewCtx.moveTo(0, y);
    previewCtx.lineTo(w, y);
    previewCtx.stroke();
  }
  previewCtx.restore();

  // Draw Seeker FOV (cone from top center)
  previewCtx.save();
  previewCtx.translate(cx, 0);
  const fovAngle = Math.PI / 3;
  const fovRadius = h * 1.1;
  const gradient = previewCtx.createRadialGradient(0, 0, 0, 0, 0, fovRadius);
  gradient.addColorStop(0, "rgba(111,242,165,0.08)");
  gradient.addColorStop(1, "rgba(111,242,165,0)");
  previewCtx.fillStyle = gradient;
  previewCtx.beginPath();
  previewCtx.moveTo(0, 0);
  previewCtx.arc(0, 0, fovRadius, -fovAngle/2, fovAngle/2);
  previewCtx.closePath();
  previewCtx.fill();
  previewCtx.strokeStyle = "rgba(111,242,165,0.15)";
  previewCtx.lineWidth = 1;
  previewCtx.beginPath();
  previewCtx.moveTo(0, 0);
  previewCtx.lineTo(Math.sin(-fovAngle/2) * fovRadius, Math.cos(-fovAngle/2) * fovRadius);
  previewCtx.moveTo(0, 0);
  previewCtx.lineTo(Math.sin(fovAngle/2) * fovRadius, Math.cos(fovAngle/2) * fovRadius);
  previewCtx.stroke();
  previewCtx.restore();

  // Draw boundary zone (bottom area)
  previewCtx.save();
  const boundaryGradient = previewCtx.createLinearGradient(0, boundaryY, 0, h);
  boundaryGradient.addColorStop(0, "rgba(255,184,107,0)");
  boundaryGradient.addColorStop(0.3, "rgba(255,184,107,0.08)");
  boundaryGradient.addColorStop(1, "rgba(255,184,107,0.15)");
  previewCtx.fillStyle = boundaryGradient;
  previewCtx.fillRect(0, boundaryY, w, h - boundaryY);
  previewCtx.strokeStyle = "rgba(255,184,107,0.3)";
  previewCtx.lineWidth = 2;
  previewCtx.setLineDash([10, 10]);
  previewCtx.beginPath();
  previewCtx.moveTo(0, boundaryY);
  previewCtx.lineTo(w, boundaryY);
  previewCtx.stroke();
  previewCtx.setLineDash([]);
  previewCtx.fillStyle = "rgba(255,184,107,0.6)";
  previewCtx.font = '600 10px "Space Grotesk"';
  previewCtx.textAlign = "center";
  previewCtx.fillText("VIRTUAL BOUNDARY", cx, boundaryY - 8);
  previewCtx.restore();

  // Draw Action Taker position (bottom center)
  previewCtx.save();
  previewCtx.translate(atX, atY);
  // Base
  previewCtx.fillStyle = "rgba(16,24,21,0.8)";
  previewCtx.beginPath();
  previewCtx.roundRect(-50, -30, 100, 50, 8);
  previewCtx.fill();
  previewCtx.strokeStyle = "rgba(111,242,165,0.3)";
  previewCtx.lineWidth = 1;
  previewCtx.stroke();

  // LED ring
  const ringActive = ["puzzle", "solving", "reward", "autoSolve", "ballPlay"].includes(simState);
  if (ringActive) {
    const pulse = 1 + Math.sin(previewTime * 3) * 0.15;
    previewCtx.beginPath();
    previewCtx.arc(0, -10, 18 * pulse, 0, Math.PI * 2);
    previewCtx.strokeStyle = simState === "ballPlay" ? "rgba(255,184,107,0.8)" : "rgba(111,242,165,0.8)";
    previewCtx.lineWidth = 3;
    previewCtx.stroke();
  }

  // Puzzle indicator
  if (["puzzle", "solving"].includes(simState)) {
    previewCtx.fillStyle = "rgba(111,242,165,0.9)";
    previewCtx.font = '600 9px "Space Grotesk"';
    previewCtx.textAlign = "center";
    previewCtx.fillText("PUZZLE", 0, -10);
    // Progress bar
    previewCtx.fillStyle = "rgba(255,255,255,0.1)";
    previewCtx.fillRect(-40, 0, 80, 6);
    previewCtx.fillStyle = "rgba(111,242,165,0.9)";
    previewCtx.fillRect(-40, 0, 80 * (puzzleProgress / 100), 6);
  }

  // Ball play indicator
  if (simState === "ballPlay") {
    previewCtx.fillStyle = "rgba(255,184,107,0.9)";
    previewCtx.font = '600 9px "Space Grotesk"';
    previewCtx.textAlign = "center";
    previewCtx.fillText("BALL PLAY", 0, -10);
  }

  previewCtx.restore();

  // Draw sound waves
  if (simState === "sound" || soundWaves.length > 0) {
    soundWaves = soundWaves.filter(w => w.radius < w.maxRadius);
    soundWaves.forEach(w => {
      previewCtx.save();
      previewCtx.globalAlpha = 1 - w.radius / w.maxRadius;
      previewCtx.strokeStyle = "rgba(255,184,107,0.6)";
      previewCtx.lineWidth = 2;
      previewCtx.beginPath();
      previewCtx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
      previewCtx.stroke();
      previewCtx.restore();
      w.radius += w.speed * previewSpeed;
    });
  }

  // Draw dog
  const dogScreenX = dogX * w;
  const dogScreenY = dogY * h;

  // Dog trail
  if (!window.dogTrail) window.dogTrail = [];
  window.dogTrail.push({ x: dogScreenX, y: dogScreenY });
  if (window.dogTrail.length > 30) window.dogTrail.shift();

  previewCtx.save();
  previewCtx.strokeStyle = "rgba(255,255,255,0.15)";
  previewCtx.lineWidth = 2;
  previewCtx.lineCap = "round";
  previewCtx.beginPath();
  window.dogTrail.forEach((p, i) => {
    if (i === 0) previewCtx.moveTo(p.x, p.y);
    else previewCtx.lineTo(p.x, p.y);
  });
  previewCtx.stroke();
  previewCtx.restore();

  // Dog body
  previewCtx.save();
  previewCtx.translate(dogScreenX, dogScreenY);
  previewCtx.rotate(dogAngle);

  // Body
  previewCtx.fillStyle = "#fff";
  previewCtx.beginPath();
  previewCtx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2);
  previewCtx.fill();
  previewCtx.shadowColor = "rgba(255,255,255,0.5)";
  previewCtx.shadowBlur = 8;
  previewCtx.fill();
  previewCtx.shadowBlur = 0;

  // Head
  previewCtx.beginPath();
  previewCtx.ellipse(18, -4, 10, 8, 0, 0, Math.PI * 2);
  previewCtx.fill();

  // Ears
  previewCtx.fillStyle = "#f0f0f0";
  previewCtx.beginPath();
  previewCtx.ellipse(22, -10, 5, 7, -0.3, 0, Math.PI * 2);
  previewCtx.fill();
  previewCtx.beginPath();
  previewCtx.ellipse(24, -4, 5, 7, 0.3, 0, Math.PI * 2);
  previewCtx.fill();

  // Eyes
  previewCtx.fillStyle = "#1a1a1a";
  previewCtx.beginPath();
  previewCtx.arc(22, -5, 2, 0, Math.PI * 2);
  previewCtx.fill();
  previewCtx.beginPath();
  previewCtx.arc(25, -4, 2, 0, Math.PI * 2);
  previewCtx.fill();

  // Tag on collar
  previewCtx.fillStyle = "#ffb86b";
  previewCtx.beginPath();
  previewCtx.arc(-8, 6, 4, 0, Math.PI * 2);
  previewCtx.fill();
  previewCtx.shadowColor = "#ffb86b";
  previewCtx.shadowBlur = 6;
  previewCtx.fill();
  previewCtx.shadowBlur = 0;

  // Direction indicator
  previewCtx.strokeStyle = "rgba(111,242,165,0.6)";
  previewCtx.lineWidth = 2;
  previewCtx.beginPath();
  previewCtx.moveTo(28, 0);
  previewCtx.lineTo(40, 0);
  previewCtx.stroke();

  previewCtx.restore();

  // Dog label
  previewCtx.save();
  previewCtx.fillStyle = "rgba(233,240,234,0.9)";
  previewCtx.font = '600 11px "Space Grotesk"';
  previewCtx.textAlign = "center";
  previewCtx.fillText("NALA", dogScreenX, dogScreenY - 30);
  previewCtx.restore();

  // Draw ball if active
  if (ballActive) {
    previewCtx.save();
    previewCtx.translate(ballX, ballY);
    previewCtx.fillStyle = "#ffb86b";
    previewCtx.beginPath();
    previewCtx.arc(0, 0, 12, 0, Math.PI * 2);
    previewCtx.fill();
    previewCtx.strokeStyle = "#e6a05c";
    previewCtx.lineWidth = 2;
    previewCtx.stroke();
    // Ball pattern
    previewCtx.save();
    previewCtx.rotate(ballAngle);
    previewCtx.strokeStyle = "rgba(255,255,255,0.3)";
    previewCtx.lineWidth = 1.5;
    previewCtx.beginPath();
    previewCtx.moveTo(-8, 0);
    previewCtx.lineTo(8, 0);
    previewCtx.stroke();
    previewCtx.restore();
    previewCtx.restore();
  }

  // Draw treat particle if rewarding
  if (simState === "reward") {
    const treatY = atY - 30 + Math.sin(previewTime * 5) * 20;
    previewCtx.save();
    previewCtx.translate(atX, treatY);
    previewCtx.fillStyle = "#ffb86b";
    previewCtx.beginPath();
    previewCtx.arc(0, 0, 6, 0, Math.PI * 2);
    previewCtx.fill();
    previewCtx.shadowColor = "#ffb86b";
    previewCtx.shadowBlur = 10;
    previewCtx.fill();
    previewCtx.shadowBlur = 0;
    previewCtx.restore();
  }

  // HUD overlays on canvas
  previewCtx.save();
  previewCtx.font = '600 10px "Space Grotesk"';
  previewCtx.fillStyle = "rgba(111,242,165,0.8)";
  previewCtx.textAlign = "left";
  previewCtx.fillText("SEEKER HUB · 4K/30 · 60GHz mmWave", 16, 24);
  previewCtx.fillStyle = "rgba(255,184,107,0.6)";
  previewCtx.fillText("BOUNDARY ZONE", 16, boundaryY - 16);
  previewCtx.restore();
}

function previewLoop() {
  if (!previewRunning || previewPaused) return;

  const dt = (1/60) * previewSpeed;
  previewTime += dt;

  // Smooth dog movement toward target
  const easing = 0.08 * previewSpeed;
  dogX += (dogTargetX - dogX) * easing;
  dogY += (dogTargetY - dogY) * easing;

  // Update dog angle toward movement direction
  const dx = dogTargetX - dogX;
  const dy = dogTargetY - dogY;
  if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
    dogAngle = Math.atan2(dy, dx) - Math.PI/2;
  }

  // State machine
  switch (simState) {
    case "moving":
      if (dogX > 0.85 || dogY > 0.7) {
        setSimState("boundary");
        logSim("BOUNDARY", "Dog approached virtual boundary zone");
        // Auto-trigger sound after 1s
        setTimeout(() => {
          if (simState === "boundary") triggerSound();
        }, 1000 / previewSpeed);
      }
      break;

    case "boundary":
      // Wait for sound trigger
      break;

    case "sound":
      // Emit sound waves periodically
      if (Math.random() < 0.02 * previewSpeed) {
        soundWaves.push({ x: canvasCX, y: canvasH * 0.9, radius: 0, maxRadius: 300, speed: 2 });
      }
      // After 2s, trigger puzzle
      if (!window.soundStartTime) window.soundStartTime = previewTime;
      if (previewTime - window.soundStartTime > 2) {
        triggerPuzzle();
      }
      break;

    case "puzzle":
      // Puzzle presented, wait for solving
      break;

    case "solving":
      puzzleProgress += 0.5 * previewSpeed;
      previewElements.hudProgress.textContent = Math.round(puzzleProgress) + "%";
      if (puzzleProgress >= 100) {
        triggerReward();
      } else if (puzzleProgress > 30 && Math.random() < 0.001 * previewSpeed) {
        // Random chance of dog getting bored
        triggerAutoSolve();
      }
      break;

    case "reward":
      treatCount = Math.max(0, treatCount - 1);
      previewElements.hudTreats.textContent = treatCount;
      setTimeout(() => {
        if (simState === "reward") triggerBallPlay();
      }, 2000 / previewSpeed);
      break;

    case "autoSolve":
      puzzleProgress = Math.min(100, puzzleProgress + 2 * previewSpeed);
      previewElements.hudProgress.textContent = Math.round(puzzleProgress) + "%";
      if (puzzleProgress >= 100) {
        triggerReward();
      }
      break;

    case "ballPlay":
      if (!ballActive) {
        const dogScreenX = dogX * canvasW;
        const dogScreenY = dogY * canvasH;
        ballX = dogScreenX || atX;
        ballY = dogScreenY || atY;
        ballActive = true;
        ballAngle = 0;
      }
      ballAngle += 0.1 * previewSpeed;
      ballX += Math.cos(ballAngle) * 2 * previewSpeed;
      ballY += Math.sin(ballAngle) * 1.5 * previewSpeed;
      // Bounce off walls
      if (ballX < 20 || ballX > canvasW - 20) ballAngle = Math.PI - ballAngle;
      if (ballY < 20 || ballY > canvasH - 20) ballAngle = -ballAngle;
      // Dog chases ball
      dogTargetX = ballX / canvasW;
      dogTargetY = ballY / canvasH;
      break;
  }

  drawPreviewFrame();
  previewRaf = requestAnimationFrame(previewLoop);
}

function triggerMove() {
  if (simState !== "idle" && simState !== "moving") return;
  setSimState("moving");
  dogTargetX = 0.5 + Math.random() * 0.3;
  dogTargetY = 0.6 + Math.random() * 0.2;
  logSim("MOVEMENT", "Seeker detected sustained movement — Tag UWB + vision confirm");
  previewElements.triggerMove.disabled = true;
  previewElements.triggerBoundary.disabled = false;
}

function triggerBoundary() {
  if (simState !== "moving") return;
  setSimState("boundary");
  dogTargetX = 0.9;
  dogTargetY = 0.85;
  logSim("BOUNDARY", "Mesh handoff — Seeker Field detects boundary approach");
  previewElements.triggerBoundary.disabled = true;
  // Auto sound after delay
  setTimeout(() => triggerSound(), 1500 / previewSpeed);
}

function triggerSound() {
  if (simState !== "boundary") return;
  setSimState("sound");
  window.soundStartTime = previewTime;
  soundWaves = [];
  logSim("SOUND", "Action Taker emitted curiosity chirp — dog orienting reflex triggered");
  previewElements.triggerIgnore.disabled = false;
}

function triggerPuzzle() {
  if (simState !== "sound") return;
  setSimState("puzzle");
  puzzleProgress = 0;
  previewElements.hudProgress.textContent = "0%";
  logSim("PUZZLE", "Action Taker presented sliding panel puzzle — scent puff released");
  // Auto-start solving after 1s
  setTimeout(() => {
    if (simState === "puzzle") triggerSolving();
  }, 1000 / previewSpeed);
}

function triggerSolving() {
  if (simState !== "puzzle") return;
  setSimState("solving");
  logSim("SOLVING", "Dog manipulating panels — progress tracking via force sensors");
}

function triggerReward() {
  if (simState !== "solving" && simState !== "autoSolve") return;
  setSimState("reward");
  const wasAuto = simState === "autoSolve";
  logSim("REWARD", `Treat dispensed (${wasAuto ? "auto-solve" : "dog solved"}) — 1 treat, ${treatCount - 1} remaining`);
}

function triggerAutoSolve() {
  if (simState !== "solving") return;
  setSimState("autoSolve");
  logSim("AUTO-SOLVE", "No progress 60s — wheel auto-rotated to solution, treat dispensed");
}

function triggerBallPlay() {
  if (simState !== "reward") return;
  setSimState("ballPlay");
  logSim("BALL PLAY", "Internal roller launched ball — unpredictable zig-zag pattern");
  previewElements.triggerPlay.disabled = true;
}

function startSimulation() {
  if (previewRunning) return;
  previewRunning = true;
  previewPaused = false;
  previewTime = 0;
  simState = "idle";
  dogX = 0.3;
  dogY = 0.5;
  dogTargetX = 0.3;
  dogTargetY = 0.5;
  puzzleProgress = 0;
  treatCount = 500;
  ballActive = false;
  soundWaves = [];
  window.dogTrail = [];
  window.soundStartTime = null;

  previewElements.log.innerHTML = "";
  previewElements.hudProgress.textContent = "0%";
  previewElements.hudTreats.textContent = treatCount;
  setSimState("idle");

  previewElements.startBtn.disabled = true;
  previewElements.pauseBtn.disabled = false;
  previewElements.resetBtn.disabled = false;
  previewElements.triggerMove.disabled = false;
  previewElements.triggerBoundary.disabled = true;
  previewElements.triggerIgnore.disabled = true;
  previewElements.triggerPlay.disabled = true;

  addLog("SYSTEM", "Simulation started — Seeker Hub camera feed active");
  addLog("STATUS", "Dog resting — Tag pulse 62 bpm, vision confirms rest");

  resizePreviewCanvas();
  previewRaf = requestAnimationFrame(previewLoop);
}

function pauseSimulation() {
  previewPaused = !previewPaused;
  previewElements.pauseBtn.textContent = previewPaused ? "Resume" : "Pause";
  if (!previewPaused) previewRaf = requestAnimationFrame(previewLoop);
}

function resetSimulation() {
  previewRunning = false;
  previewPaused = false;
  if (previewRaf) cancelAnimationFrame(previewRaf);
  previewRaf = null;

  previewElements.startBtn.disabled = false;
  previewElements.pauseBtn.disabled = true;
  previewElements.resetBtn.disabled = true;
  previewElements.triggerMove.disabled = true;
  previewElements.triggerBoundary.disabled = true;
  previewElements.triggerIgnore.disabled = true;
  previewElements.triggerPlay.disabled = true;
  previewElements.pauseBtn.textContent = "Pause";

  previewElements.log.innerHTML = "";
  previewElements.hudProgress.textContent = "0%";
  previewElements.hudTreats.textContent = "500";
  setSimState("idle");
  previewElements.status.classList.remove("active");

  if (previewCtx) {
    const w = previewCanvas.width / (window.devicePixelRatio || 1);
    const h = previewCanvas.height / (window.devicePixelRatio || 1);
    previewCtx.clearRect(0, 0, w, h);
  }
  addLog("SYSTEM", "Simulation reset — ready to start");
}

// Event listeners
if (previewElements.startBtn) {
  previewElements.startBtn.addEventListener("click", startSimulation);
  previewElements.pauseBtn.addEventListener("click", pauseSimulation);
  previewElements.resetBtn.addEventListener("click", resetSimulation);
  previewElements.triggerMove.addEventListener("click", triggerMove);
  previewElements.triggerBoundary.addEventListener("click", triggerBoundary);
  previewElements.triggerIgnore.addEventListener("click", () => {
    if (simState === "sound") {
      triggerPuzzle();
      previewElements.triggerIgnore.disabled = true;
    }
  });
  previewElements.triggerPlay.addEventListener("click", triggerBallPlay);
  previewElements.speedInput.addEventListener("input", (e) => {
    previewSpeed = Number(e.target.value);
    previewElements.speedLabel.textContent = previewSpeed + "×";
  });
}

if (previewCanvas) {
  window.addEventListener("resize", () => {
    clearTimeout(window.previewResizeTimer);
    window.previewResizeTimer = setTimeout(resizePreviewCanvas, 150);
  });
  resizePreviewCanvas();
}

// Initial log
addLog("SYSTEM", "Shepherd preview ready — click Start Simulation");