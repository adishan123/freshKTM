import React from 'react';

const Input = ({ type, label, value, onChange, placeholder, ...restProps }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        {...restProps}
      />
    </div>
  );
};

export default Input;
