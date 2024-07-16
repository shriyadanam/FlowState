import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Row, Col } from 'antd';
import DeviceAvailability from './components/DeviceAvailability';
import Form from './components/Form';
import './App.css'
import NetworkAvailibilityDonut from './components/NetworkAvailabilityDonut'
import TopIPs from './components/TopIPs'
import Visualization from './components/Visualization/graph'
import NetworkPieChart from './components/NetworkPieChart'


function App() {
  return (
    <Row justify="space-between" gutter={4}>
      <Col xs={24} md={12} lg={5}>
        <TopIPs />
      </Col>
      <Col xs={24} md={12} lg={15}>
        <Form />
      </Col>
      <Col xs={24} md={12} lg={15}>
        <Visualization />
      </Col>
    </Row>
  )
}

export default App
