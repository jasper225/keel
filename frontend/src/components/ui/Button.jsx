// Button component for the UI
import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ onClick, children, className, type = 'button' }){
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        >
            {children}
        </button>
    );
}

