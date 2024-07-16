import { styles } from './styles.jsx';
import { styles as commonStyles } from '../styles.jsx';
import React, { useState, useEffect } from 'react';


const fetchIPs = async () => {
  const response = await fetch('http://localhost:5000/topips');
  return response.json();
};


export default function TopIPs() {
  const [ips, setIps] = useState({ "Top_Source_IPs": [], "Top_Destination_IPs": [] });
  useEffect(() => {
    const fetchData = async () => {
      const ipData = await fetchIPs();
      setIps(ipData);
    };
    fetchData();
  }, []);
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Most Used IPs</h2>
      <div style={styles.listsContainer}>
        <div style={styles.listSection}>
          <h3 style={styles.header}>Source</h3>
          <ul style={styles.list}>
            {ips["Top_Source_IPs"].slice(0, 5).map((ip, index) => (
              <li
                key={index}
                style={styles.listItem}
              >
                {ip}
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.listSection}>
          <h3 style={styles.header}>Destination</h3>
          <ul style={styles.list}>
            {ips["Top_Destination_IPs"].slice(0, 5).map((ip, index) => (
              <li
                key={index}
                style={styles.listItem}
              >
                {ip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}