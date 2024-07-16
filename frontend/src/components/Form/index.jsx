import { styles } from './styles.jsx';
import { styles as commonStyles } from '../styles.jsx';
import React, { useState, useEffect } from 'react';

const MyForm = () => {
    // State variables to store form input values
    // 'duration', 'src_bytes', 'serror_rate', 'num_file_creations', 'num_shells', 'service', 'num_failed_logins':
    const [service, setService] = useState('');
    const [src_bytes, setSrcBytes] = useState('');
    const [num_file_creations, setNumFileCreations] = useState('');
    const [num_shells, setNumShells] = useState('');
    const [num_failed_logins, setNumFailedLogins] = useState('');
    const [duration, setDuration] = useState('');
    // const [serror_rate, setSerrorRate] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Here you can handle the form submission logic, e.g., sending data to backend
        
        const url = 'http://localhost:5000/formsubmission'
        const data = {
            'Service': service,
            'SourceBytes': src_bytes,
            'FileCreations': num_file_creations,
            'Shells': num_shells,
            'FailedLogins': num_failed_logins,
            'Shells': num_shells,
            'FailedLogins': num_failed_logins,
            'Duration': duration
        }
        
        // const response = requests.post(url, data=data)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Add other headers as needed
            },
            body: JSON.stringify(data)  // Convert data to JSON string
        };
        fetch(url, requestOptions)
            .then(response => {
                // if (!response.ok) {
                //     throw new Error(`HTTP error! Status: ${response.status}`);
                // }
                return response.json();  // Parse response body as JSON
            })
            .then(data => {
                console.log('POST request successful:');
                console.log(data);  // Display parsed JSON data
            })
            .catch(error => {
                console.error('POST request failed:', error);
            });


        setService('');
        setSrcBytes('');
        setNumFileCreations('');
        setNumShells('');
        setNumFailedLogins('');
        setDuration('');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Find the Attack</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label>
                    Service:
                    <input
                        type="text"
                        value={service}
                        style={styles.input}
                        onChange={(e) => setService(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Source Bytes:
                    <input
                        type="text"
                        value={src_bytes}
                        style={styles.input}
                        onChange={(e) => setSrcBytes(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Number of Files Created:
                    <input
                        type="text"
                        style={styles.input}
                        value={num_file_creations}
                        onChange={(e) => setNumFileCreations(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Number of Shells:
                    <input
                        type="text"
                        style={styles.input}
                        value={num_shells}
                        onChange={(e) => setNumShells(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Number of Failed Logins:
                    <input
                        type="text"
                        style={styles.input}
                        value={num_failed_logins}
                        onChange={(e) => setNumFailedLogins(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Duration:
                    <input
                        type="text"
                        style={styles.input}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button 
                    style={styles.button}
                    type="submit"
                >
                    Submit
                    </button>
            </form>
        </div>
    );
};

export default MyForm;
