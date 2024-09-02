// Error.js
import React from 'react';

export const Error = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Something went wrong!!!</h1>
            <p style={styles.paragraph}>Check your connection!!!</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black',
        color: '#FFF',
        textAlign: 'center',
        padding: '20px',
    },
    header: {
        fontSize: '36px',
        marginBottom: '10px',
    },
    paragraph: {
        fontSize: '18px',
        color: '#FFF',
    },
};

export default Error;
