import { Hono } from "hono";
type Bindings = {
  DO:DurableObjectNamespace
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

app.get("/ws", async (c) => {
  if (c.req.header("upgrade") !== "websocket") {
    return c.text("Expected Upgrade: websocket", 426);
  }
  const id = c.env.DO.idFromName("default");
  const stub = c.env.DO.get(id);
  return stub.fetch(c.req.raw)
});

export default app;