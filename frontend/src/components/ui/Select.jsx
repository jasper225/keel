import React from 'react';
import PropTypes from 'prop-types';

export default function Select({ options, onChange, className }) {
    return (
        <select
            options={options}
            onChange={onChange}
            className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}