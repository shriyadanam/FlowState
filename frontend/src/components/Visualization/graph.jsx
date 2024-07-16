import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GraphDisplay = () => {
  const [graphUrl, setGraphUrl] = useState('');

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const response = await axios.get('http://localhost:5000/generate-graph', {
          responseType: 'blob'
        });
        const url = URL.createObjectURL(response.data);
        setGraphUrl(url);
      } catch (error) {
        console.error('Error fetching graph:', error);
      }
    };

    fetchGraph();
  }, []);

  return (
    <div>
      {graphUrl && <img src={graphUrl} alt="Network Graph" />}
    </div>
  );
};

export default GraphDisplay;