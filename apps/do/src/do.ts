import { DurableObject } from "cloudflare:workers";

export class DemoDO extends DurableObject {
  connections: Set<WebSocket>;

  constructor(ctx: DurableObjectState, env) {
    super(ctx, env);
    this.connections = new Set<WebSocket>();
  }

  async fetch(req: Request) {
    const websocketPair = new WebSocketPair();
    const [client, server] = Object.values(websocketPair);
    this.ctx.acceptWebSocket(server);
    this.connections.add(client);
    console.log("websocket accepted")
    return new Response(null, {
      status: 101,
      webSocket: client
    });
  }

  webSocketError(ws: WebSocket, error: unknown) {
    console.error("webSocketError", error);
    this.connections.delete(ws);
  }

  webSocketClose(
    ws: WebSocket,
    _code: number,
    _reason: string,
    _wasClean: boolean
  ) {
    console.log(`close ws:${_code},reason:${_reason}, connections`, this.connections);
    this.connections.delete(ws);
  }
}