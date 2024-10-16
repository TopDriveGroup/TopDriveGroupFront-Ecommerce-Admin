import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BASEURL_SOCKETIO);

// Verifica la conexión
socket.on('connect', () => {
    console.log('Conectado al servidor Socket.IO');
});

// Maneja el evento 'pendingTransactions'
socket.on('pendingTransactions', (data) => {
    console.log('Transacciones pendientes recibidas:', data);
    // Aquí puedes actualizar tu estado o la UI según necesites
});

export default socket;