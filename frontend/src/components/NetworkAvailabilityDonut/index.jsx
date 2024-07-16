import React, { useEffect, useState } from "react"
import { PieChart } from '@mui/x-charts/PieChart';

function NetworkAvailibilityDonut() {
  const [networkCounts, setNetworkCounts] = useState(null)

  const fetchNetworkCounts = async () => {
    const response = await fetch("http://localhost:5000/network-counts")
    const json = await response.json()
    setNetworkCounts({
      normal: json.normal,
      attacks: json.r2l + json.probe + json.dos + json.u2r
    })
  }

  useEffect(() => {
    fetchNetworkCounts()
  }, [])

  if (!networkCounts)
    return null

  return (
    <>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: networkCounts.normal, color: "#059dd9", label: 'Normal' },
              { id: 1, value: networkCounts.attacks, color: "#f45b5a", label: 'Attacks' },
            ],
            innerRadius: 40,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        slotProps={{
          legend: {
            labelStyle: {
              fill: 'white'
            }
          }
        }}
        width={400}
        height={200}
        
      />
    </>
  )
}

export default NetworkAvailibilityDonut