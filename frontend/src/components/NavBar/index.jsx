// src/components/Index.jsx
import React from 'react';
import logo from './nutanix_logo.png';  // Import the image file

// Inline styles
const styles = {
    navbar: {
        backgroundColor: '#333',
        padding: '10px 20px',  // Adjust padding for desired height
        display: 'flex',
        width: '1190px',
        height: '20px',
        alignItems: 'center',
        marginBottom: '10px',
        justifyContent: 'flex-start',  // Align items to the left
        color: '#F2F2F2',
        borderRadius: '4px',
    },
    logo: {
        marginRight: '20px',  // Space between the logo and the text
    },
    logoImage: {
        height: '40px',  // Adjust logo size
    },
    text: {
        fontSize: '18px',  // Text size
        margin: 0,
        
    },
};
const Index = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <img src={logo} style={styles.logoImage} />
            </div>
            <div style={styles.text}>
                <p><b>Flow State</b></p>
            </div>
        </nav>
    );
};
export default Index;













