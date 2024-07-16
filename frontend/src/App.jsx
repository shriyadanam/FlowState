// React and useState import
import React, { useMemo, useState } from 'react';

// Ant Design imports
import { Row, Col, notification, message } from 'antd';

// CSS import
import './App.css'

// Component imports
import NetworkAvailibilityDonut from './components/NetworkAvailabilityDonut';
import Form from './components/Form';
import TopIPs from './components/TopIPs';
import Visualization from './components/Visualization/graph';
import NetworkPieChart from './components/NetworkPieChart';
import ChatBot from './components/ChatBot';
import axios from 'axios';
import { fontWeight } from '@mui/system';
import NavBar from './components/NavBar';

const Context = React.createContext({ name: 'Default' });
const API_KEY = "api-key"
const systemMessage = {
  "role": "system",
  "content": "Explain like a tech support agent who is knowledgeable about computer networks"
}

// App component
function App() {
  const [messages, setMessages] = useState([{
        message: "What can I help you with?",
        sender: "ChatGPT",
        direction: "incoming"
  }])
  const contextValue = useMemo(() => ({ notification }), []);
  const [api, contextholder] = notification.useNotification();

  async function sendAPIRequest(chatMessages){
    let apiMessages = chatMessages.map((msgObj) =>{
        let role = msgObj.sender === "ChatGPT" ? "assistant" : "user";
        return {
            role: role,
            content: msgObj.message
        }
    })
    
    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            systemMessage,
            ...apiMessages
        ]
    }
    await fetch("https://api.openai.com/v1/chat/completions", 
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        }).then((data) => {
          return data.json();
        }).then((data) => {
          setMessages(() => {
            const newMessages = [...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT",
                direction: "incoming"
              }]
            console.log(newMessages)
            return newMessages
          });
        });
  } 
  
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
        <Row>
        <div>
              <NavBar />
            </div>
          </Row>
        <Row justify="space-between" gutter={24}>
          <Col span={8}>
            <div className="component-box">
              <NetworkPieChart />
            </div>
          </Col>
          <Col span={8}>
            <div className="component-box">
              <NetworkAvailibilityDonut />
            </div>
          </Col>
          <Col span={8}>
            <div className="component-box">
              <TopIPs />
            </div>
          </Col>
        </Row>
        <Row justify="space-between" gutter={24}>
          <Col>
            <div className="component-box">
              <Form 
                messages={messages}
                setMessages={setMessages} 
                sendApiRequest={sendAPIRequest} 
              />
            </div>
          </Col>
          <Col>
            <div className="component-box">
              <Visualization />
            </div>
          </Col>
        </Row>
        <Row justify="space-between" gutter={24}>
          <Col span={11}>
            <div className="component-box">
              <Form />
            </div>
          </Col>
          <Col span={12}>
            <div className="component-box">
              <ChatBot 
                messages={messages} 
                setMessages={setMessages} 
                sendAPIRequest={sendAPIRequest} 
              />
            </div>
          </Col>
        </Row>
      </Context.Provider>
    </div>
  );
}

export default App
