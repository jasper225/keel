import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ onChange, placeholder, className, type = 'text' }){
    return (
        <input
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        >
        </input>
    );
}

