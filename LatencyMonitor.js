import React, { useState, useEffect } from 'react';
import WebSocket from 'websocket';

const LatencyMonitor = () => {
  const [latency, setLatency] = useState(null);
  const websocketUrl = 'ws://localhost:55455'; // Pylon's WebSocket endpoint

  useEffect(() => {
    const client = new WebSocket.client();

    client.on('connect', (connection) => {
      console.log('Connected to Pylon');
      
      connection.on('message', (message) => {
        if (message.type === 'utf8') {
          const packetData = JSON.parse(message.utf8Data);
          const packetTimestamp = packetData.timestamp;
          const currentTimestamp = Date.now();
          const packetLatency = currentTimestamp - packetTimestamp;
          setLatency(packetLatency);
        }
      });
    });

    client.connect(websocketUrl);

    return () => {
      client.abort();
    };
  }, []);

  return (
    <div className="latency-monitor">
      <h3>Packet Latency:</h3>
      {latency !== null ? <p>{latency} ms</p> : <p>Connecting...</p>}
    </div>
  );
};

export default LatencyMonitor;
