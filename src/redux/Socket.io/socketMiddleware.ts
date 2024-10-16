/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware, MiddlewareAPI, Dispatch } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

// ACCIONES PARA SOCKETS
export type SocketAction =
  | { type: 'socket/connect'; payload: string }
  | { type: 'socket/connected' }
  | { type: 'socket/disconnected' }
  | { type: 'socket/disconnect' }
  | { type: 'socket/eventReceived'; payload: any };

export const socketMiddleware: Middleware<any> = 
  ({ dispatch }: MiddlewareAPI<Dispatch>) => {
    let socket: Socket | null = null;

    return (next) => (action: any) => {
        switch (action.type) {
            case 'socket/connect':
                if (socket) return;
                socket = io(action.payload);

                socket.on('connect', () => {
                    console.log('Conectado al servidor Socket.IO');
                    dispatch({ type: 'socket/connected' });
                });

                socket.on('disconnect', () => {
                    console.log('Desconectado del servidor Socket.IO');
                    dispatch({ type: 'socket/disconnected' });
                });

                socket.on('connect_error', (error) => {
                    console.error('Error de conexión:', error);
                    dispatch({ type: 'socket/eventReceived', payload: error });
                });

                // EVENT DE EJEMPLO
                socket.on('eventName', (data) => {
                    console.log('Evento recibido:', data);
                    dispatch({ type: 'socket/eventReceived', payload: data });
                });
                break;

            case 'socket/disconnect':
                socket?.disconnect();
                socket = null;
                break;

            default:
            break;
      }

        return next(action);
    };
};
