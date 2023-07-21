function emit(io) {
	io.on('connection', socket => {
		console.log('Socket connected:', socket.id);
		socket.emit(message, data);
	});
}

export default emit;
