
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Hono } from "hono";
import { handle } from "hono/vercel";
const app = new Hono().basePath('/api');

app.get("/ws", async (c) => {
  if (c.req.header("upgrade") !== "websocket") {
    return c.text("Expected Upgrade: websocket", 426);
  }
  const id = getCloudflareContext().env.DO.idFromName("default");
  const stub = getCloudflareContext().env.DO.get(id);
  return stub.fetch(c.req.raw.url, {
    ...c.req.raw,
    headers: c.req.raw.headers
  })
});

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)