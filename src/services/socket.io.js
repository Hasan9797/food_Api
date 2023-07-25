import { ws } from '../server.js';

const socketEmitter = (message, data) => {
	ws.on('connection', () => {
		console.log('connection');
		ws.emit(message, data);
	});
};

export default socketEmitter;
