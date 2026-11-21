const fs = require("fs");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  let targets;
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch("http://127.0.0.1:9222/json/list");
      targets = await res.json();
      if (targets.length) break;
    } catch (err) {
      await sleep(500);
    }
  }
  const page = targets.find((t) => t.type === "page");
  if (!page) throw new Error("No page target found");

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
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "http://127.0.0.1:8124/" });
  await sleep(2500);

  const expression = `(async () => {
    const set = (id, val) => { const el = document.getElementById(id); el.value = val; el.dispatchEvent(new Event('input', {bubbles:true})); el.dispatchEvent(new Event('change', {bubbles:true})); };
    set('name', 'Alex Rivera');
    set('email', 'alex@example.com');
    const kit = document.getElementById('kit');
    kit.value = 'pack';
    kit.dispatchEvent(new Event('change', {bubbles:true}));
    set('quantity', '1');
    const cb = document.querySelector('input[value="taker-gate"]');
    cb.checked = true;
    cb.dispatchEvent(new Event('change', {bubbles:true}));
    const q = cb.closest('label').querySelector('.addon-qty');
    q.value = '2';
    q.dispatchEvent(new Event('input', {bubbles:true}));
    document.getElementById('dogName').value = 'Nala';
    document.getElementById('consent').checked = true;
    document.getElementById('orderForm').requestSubmit();
    await new Promise(r => setTimeout(r, 3000));
    return {
      successHidden: document.getElementById('orderSuccess').hidden,
      layoutHidden: document.querySelector('.order-layout').hidden,
      id: document.getElementById('successId').textContent,
      total: document.getElementById('successTotal').textContent,
      status: document.getElementById('formStatus').textContent,
      summary: document.getElementById('sumTotal').textContent,
      rows: document.getElementById('successList').innerText
    };
  })()`;

  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  console.log(JSON.stringify(result.result.value, null, 2));

  await sleep(600);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("C:\\Users\\shive\\AppData\\Local\\Temp\\opencode\\success.png", Buffer.from(shot.data, "base64"));

  ws.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
