import React from 'react';
import './FancyInput.css';

export const FancyInput = ({ label, ...props }) => {
    return (
        <div className="fancy-input-container">
            {label && <label className="fancy-input-label">{label}</label>}
            <input className="fancy-input" {...props} />
        </div>
    );
};

export default FancyInput;
