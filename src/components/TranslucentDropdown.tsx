import React from 'react';

const TranslucentDropdown: React.FC = ({ data, selectedDepartment, onDepartmentChange }) => {

    return (
        <div style={{ marginBottom: 16 }}>
            <select
                value={selectedDepartment}
                onChange={(e) => onDepartmentChange(e.target.value)}
            >
                <option value="">All Departments</option>
                {data.map((data) => (<option key={data} value={data}>{data}</option>))} 
            </select>

            {selectedDepartment && (
            <button
                style={{ marginLeft: 8 }}
                onClick={() => onDepartmentChange("")}
            >
                Clear Filter
            </button>
            )}
        </div>
    );
};

export default TranslucentDropdown