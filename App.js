import React from 'react';
import Banner from './Banner';
import Exhibit from './Exhibit';
import LatencyMonitor from './LatencyMonitor';

function App() {
  return (
    <div>
      <Banner title="My React Website" />
      <Exhibit title="Packet Latency">
        <LatencyMonitor />
      </Exhibit>
    </div>
  );
}

export default App;
