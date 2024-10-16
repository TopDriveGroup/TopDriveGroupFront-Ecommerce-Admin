/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export function useSocket(url: string) {
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const newSocket = io(url);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [url]);

    return socket;
}