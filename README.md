# node-ws-server

A lightweight, high-performance WebSocket server boilerplate for Node.js built on top of the robust `ws` library. Designed as a foundational block for real-time applications, event streaming, or live communication microservices.

## Features

- ⚡ **Lightweight & Fast:** Uses the raw `ws` library for maximum performance and minimal memory overhead.
- 🔄 **Heartbeat Guards:** Automated ping/pong checking to proactively detect and clean up dead client connections.
- 📡 **Broadcast Ready:** Utility loops included out-of-the-box to send messages to all active clients or filter specific targets.
- 🛠️ **ES Module Native:** Modern JavaScript structure using clean `import`/`export` syntax.

## Prerequisites

- [Node.js](https://nodejs.org) (v18.0.0 or higher recommended)
- npm or yarn

## Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/sagarpatil-17/node-ws-server.git
cd node-ws-server
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory (optional, if using an environment loader like `dotenv`):
```env
PORT=8080
```

### 3. Run the Server

```bash
# Start the server normally
npm start

# Run in development mode (if nodemon is installed)
npm run dev
```

The WebSocket server will spin up and listen on `ws://localhost:8080`.

## Architecture Overview

- **`server.js`:** The core entry point initializing the WebSocket Server (`WebSocketServer`).
- **Connection Handling:** Handles incoming connections, message parsing, validation, and disconnections cleanly.
- **Heartbeat Loop:** A background `setInterval` checks all connected sockets every 30 seconds. Sockets failing to respond with a `pong` are safely closed to prevent memory leaks.

## Production Deployments

When deploying to staging or production environments:
1. Ensure your reverse proxy (e.g., Nginx, AWS ALB, Cloudflare) is configured to handle **HTTP Upgrade headers**.
2. Secure your connections by routing traffic over **`wss://`** (WebSocket Secure) instead of unencrypted `ws://`.

## License

This project is open-source and available under the [MIT License](LICENSE).
