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
    <>
      <NetworkAvailibilityDonut pieChartData={pieChartData} />
    </>
  )
}

export default App
