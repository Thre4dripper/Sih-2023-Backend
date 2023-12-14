import { Server } from 'socket.io'

const socketConfig = (server: any) => {
    return new Server(server, {
        /* Socket.IO options (if needed) */
    })
}

export default socketConfig;
