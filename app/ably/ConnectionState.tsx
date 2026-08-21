// src/app/ConnectionState.tsx
'use client';

import { useAbly, useConnectionStateListener } from 'ably/react';
import { useState } from 'react';

export function ConnectionState() {
    const ably = useAbly();
    const [connectionState, setConnectionState] = useState(ably.connection.state);

    useConnectionStateListener((stateChange) => {
        setConnectionState(stateChange.current);
    });

    return (
        <p style={{ color: '#555', padding: '8px 10px', background: '#f0f0f0', borderRadius: '5px' }}>
            Connection: <strong>{connectionState}</strong>
        </p>
    );
}
