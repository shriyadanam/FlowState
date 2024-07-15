import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Row, Col } from 'antd';
import DeviceAvailability from './components/DeviceAvailability';
import './App.css'
import NetworkAvailibilityDonut from './components/NetworkAvailabilityDonut'

const pieChartData = [
  {
    name: "new",
    total: 40
  },
  {
    name: "evaluating",
    total: 25
  },
  {
    name: "ongoing",
    total: 22
  },
  {
    name: "finished",
    total: 22
  },
  {
    name: "archived",
    total: 10
  }
]

function App() {
  return (
      <Row justify="space-between" gutter={4}>
        <Col xs={24} md={12} lg={3}>
          <DeviceAvailability />
        </Col>
        <Col xs={24} md={12} lg={9}>
          <DeviceAvailability />
        </Col>
        <Col xs={24} md={12} lg={3}>
          <DeviceAvailability />
        </Col>
        <Col xs={24} md={12} lg={9}>
          <DeviceAvailability />
        </Col>
      </Row>
    )
}

export default App
