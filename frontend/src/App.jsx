// React and useState import
import React, { useMemo, useState } from 'react';

// Ant Design imports
import { Row, Col, notification } from 'antd';

// CSS import
import './App.css';

// Component imports
import NetworkAvailibilityDonut from './components/NetworkAvailabilityDonut';
import Form from './components/Form';
import TopIPs from './components/TopIPs';
import Visualization from './components/Visualization/graph';
import NetworkPieChart from './components/NetworkPieChart';
import ChatBot from './components/ChatBot';
import axios from 'axios';
import { fontWeight } from '@mui/system';

const Context = React.createContext({ name: 'Default' });
// App component
function App() {
  const contextValue = useMemo(() => ({ notification: notification }), []);
  const [api, contextholder] = notification.useNotification();

  async function automatedReqest() {
    return axios.get("http://localhost:5000/automated-network-request");
  }

  function getAutomatedRequests() {
    setInterval(() => {
      void (async () => {
        try {
          const res = await automatedReqest();
          if (res.data.prediction === 'normal') {
            return;
          }
          api.warning({
            message: `Suspected ${res.data.prediction.toUpperCase()} attack`,
            description: `From ${res.data.source} to ${res.data.destination}`,
            placement: 'topRight',
            icon: <img src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/08-1024.png" alt="alert" style={{height: '25px'}}/>,
          });
        }
        catch(err) {
          console.error("Error: ", err);
        }
      })();
    }, 8000);
  }

  getAutomatedRequests();

  return (
    <div className="app-container">
      <Context.Provider value={contextValue}>
        {contextholder}
        <Row justify="space-between" gutter={24}>
          <Col onClick={(e) => {
            openNotification();
          }}>
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
          <Col>
            <div className="component-box">
              <ChatBot />
            </div>
          </Col>
        </Row>
      </Context.Provider>
    </div>
  );
}

export default App;
