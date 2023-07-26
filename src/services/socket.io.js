import { Server } from 'socket.io';

let ws = {};

export const connection = server => {
	const io = new Server(server, {
		cors: { origin: '*' },
	});

	ws.io = io;
	io.on('connection', socket => {
		console.log('Socket connection, Socket: ', socket.id);
		if (socket.id) {
			ws.socket = socket;
		}
	});
};

export const emitOrder = (message, data) => {
	const { io, socket } = ws;
	io.to(socket.id).emit(message, data);
};
