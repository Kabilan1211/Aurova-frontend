import { io } from "socket.io-client"

const SOCKET_URL =
  "https://aurova-backend-production.up.railway.app"

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
})