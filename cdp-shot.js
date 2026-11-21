const fs = require("fs");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const res = await fetch("http://127.0.0.1:9222/json/list");
  const targets = await res.json();
  const page = targets.find((t) => t.type === "page");
  if (!page) throw new Error("No page target");

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
  await send("Runtime.evaluate", { expression: "document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'))" });
  await sleep(800);

  const metrics = await send("Page.getLayoutMetrics");
  const size = metrics.cssContentSize || metrics.contentSize;
  console.log("content size", size);

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: 390, height: Math.ceil(size.height), scale: 1 }
  });
  fs.writeFileSync("C:\\Users\\shive\\AppData\\Local\\Temp\\opencode\\mobile-cdp.png", Buffer.from(shot.data, "base64"));
  ws.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
