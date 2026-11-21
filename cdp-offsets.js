const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const res = await fetch("http://127.0.0.1:9222/json/list");
  const targets = await res.json();
  const page = targets.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", reject);
  });
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const msgId = ++id;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

  await send("Runtime.enable");
  await sleep(300);
  const expression = `(() => {
    const ids = ['system','mesh','control','coverage','kits','specs','faq','order'];
    const out = {};
    ids.forEach(id => { const el = document.getElementById(id); if (el) { const r = el.getBoundingClientRect(); out[id] = { top: Math.round(r.top + scrollY), height: Math.round(r.height) }; } });
    const f = document.querySelector('.footer').getBoundingClientRect();
    out.footer = { top: Math.round(f.top + scrollY), height: Math.round(f.height) };
    out.doc = document.documentElement.scrollHeight;
    return out;
  })()`;
  const result = await send("Runtime.evaluate", { expression, returnByValue: true });
  console.log(JSON.stringify(result.result.value, null, 2));
  ws.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
