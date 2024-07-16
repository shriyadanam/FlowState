// React and useState import
import React, { useState } from 'react';

// Ant Design imports
import { Row, Col } from 'antd';

// CSS import
import './App.css';

// Component imports
import NetworkAvailibilityDonut from './components/NetworkAvailabilityDonut';
import Form from './components/Form';
import TopIPs from './components/TopIPs';
import Visualization from './components/Visualization/graph';
import NetworkPieChart from './components/NetworkPieChart';

// App component
function App() {
  return (
    <div className="app-container">
      <Row justify="space-between" gutter={24}>
        <Col>
          <div className="component-box">
            <NetworkAvailibilityDonut />
          </div>
          <div className="component-box">
            <NetworkPieChart />
          </div>
        </Col>
        <Col>
          <div className="component-box">
            <TopIPs />
          </div>
        </Col>
        <Col>
          <div className="component-box">
            <Form />
          </div>
        </Col>
        <Col>
          <div className="component-box">
            <Visualization />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
