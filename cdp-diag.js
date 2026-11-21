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

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Page.navigate", { url: "http://127.0.0.1:8124/" });
  await sleep(3000);

  const expression = `(() => {
    const wide = [];
    const over = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width > 391) wide.push({ tag: el.tagName, cls: String(el.className || '').slice(0, 60), w: Math.round(r.width), left: Math.round(r.left) });
      if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) over.push({ tag: el.tagName, cls: String(el.className || '').slice(0, 60), sw: el.scrollWidth, cw: el.clientWidth });
    });
    return {
      innerWidth: window.innerWidth,
      clientWidth: document.documentElement.clientWidth,
      vvWidth: window.visualViewport && window.visualViewport.width,
      vvScale: window.visualViewport && window.visualViewport.scale,
      wide: wide.slice(0, 30),
      over: over.slice(0, 30)
    };
  })()`;

  const result = await send("Runtime.evaluate", { expression, returnByValue: true });
  console.log(JSON.stringify(result.result.value, null, 2));
  ws.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
