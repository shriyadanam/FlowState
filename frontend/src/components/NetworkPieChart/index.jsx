import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

function NetworkPieChart() {
  const [networkCounts, setNetworkCounts] = useState(null)

  const fetchNetworkCounts = async () => {
    const response = await fetch("http://localhost:5000/network-counts")
    const json = await response.json()
    setNetworkCounts(json)
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
              { id: 1, value: networkCounts.dos, color: "#89c440", label: 'DOS' },
              { id: 2, value: networkCounts.r2l, color: "#f5bc16", label: 'R2L' },
              { id: 3, value: networkCounts.probe, color: "#f58518", label: 'Probing' },
              { id: 4, value: networkCounts.u2r, color: "#f45b5a", label: 'U2R' }
            ],
          },
        ]}
        width={400}
        height={200}
        innerRadius={5}
      />
    </>
  )
}

export default NetworkPieChart