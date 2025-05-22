import React from 'react';
import { Spinner } from 'react-bootstrap';

const FullPageLoader = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default FullPageLoader;