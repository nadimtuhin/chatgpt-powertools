import React from 'react';

const ToggleButton = ({ toggle }) => {
    return (
        <button
            className="cp-bg-gray-900 cp-w-full cp-text-white cp-font-semibold cp-py-2 cp-px-4 cp-rounded"
            onClick={toggle}
        >
            Toggle
        </button>
    );
};

export default ToggleButton;
