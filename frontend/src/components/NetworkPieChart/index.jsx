import React, { useEffect, useState } from 'react';
import { styles } from './styles.jsx';
import { styles as commonStyles } from '../styles.jsx';
import { PieChart } from '@mui/x-charts/PieChart';

function NetworkPieChart() {
  const [networkCounts, setNetworkCounts] = useState(null)
  const [filterIP, setFilterIP] = useState('');

  const handleFilterChange = (event) => {
    setFilterIP(event.target.value);
  };

  const applyIPFilter = async () => {
    console.log('Sent!');
    const response = await fetch(`http://localhost:5000/network-counts?filter_ip=${filterIP}`);
    const json = await response.json();
    console.log(json);
    console.log('Recieved');
    setNetworkCounts(json)
  };

  const fetchNetworkCounts = async () => {
    const response = await fetch("http://localhost:5000/network-counts")
    const json = await response.json()
    setNetworkCounts(json)
  }

  useEffect(() => {
    fetchNetworkCounts()
  }, [])

  if (!networkCounts)
    return null;

  return (
    <div style={styles.container}>
      <h2> Network Attacks
      </h2>
      <input
        type="text"
        placeholder="Filter by IP"
        value={filterIP}
        InputProps={{ disableUnderline: true }}
        onChange={handleFilterChange}
      />
      
      <button 
        onClick={applyIPFilter}
        style={{ background: '#854D99' }}
      >
        Apply Filter</button>
        <h2></h2>
        <h2></h2>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: networkCounts.normal, color: "#059dd9", label: 'Normal' },
              { id: 1, value: networkCounts.dos, color: "#89c440", label: 'DOS' },
              { id: 2, value: networkCounts.r2l, color: "#f5bc16", label: 'R2L' },
              { id: 3, value: networkCounts.probe, color: "#f58518", label: 'Probing' },
              { id: 4, value: networkCounts.u2r, color: "#f45b5a", label: 'U2R' }
            ]
          },
        ]}
        slotProps={{
          legend: {
            labelStyle: {
              fill: 'white'
            },
          }
          
        }}
        margin={
         { top: 20}
        }
        width={350}
        height={200}
        innerRadius={5}
      />
    </div>
  )
}

export default NetworkPieChart;