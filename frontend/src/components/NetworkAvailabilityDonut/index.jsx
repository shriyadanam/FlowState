import React, { useEffect, useState } from "react"
import { PieChart } from '@mui/x-charts/PieChart';
import { styles } from './styles.jsx';
import { styles as commonStyles } from '../styles.jsx';

function NetworkAvailibilityDonut() {
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
    setNetworkCounts({
      normal: json.normal,
      attacks: json.r2l + json.probe + json.dos + json.u2r
    });
  };

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
    
    <div style={styles.container}>
      <h2 > Normal vs Attack Distribution </h2>
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
              { id: 1, value: networkCounts.attacks, color: "#89c440", label: 'Attacks' },
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
            },
          }
        }}
        width={350}
        height={200}
      />
    </div>
  )
}

export default NetworkAvailibilityDonut