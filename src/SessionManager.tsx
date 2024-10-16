// src/components/SessionManager.tsx
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SessionManager: React.FC = () => {
    useEffect(() => {
        const sessionId = sessionStorage.getItem('sessionId');

        // Si no hay un ID de sesión, generamos uno nuevo
        if (!sessionId) {
            const newSessionId = uuidv4();
            sessionStorage.setItem('sessionId', newSessionId);
        }
    }, []);
    return null; // Este componente no necesita renderizar nada
};

export default SessionManager;