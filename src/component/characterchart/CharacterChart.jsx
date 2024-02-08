import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CharacterChart = ({ data }) => {
  const [enabledCharacters, setEnabledCharacters] = useState({});

  useEffect(() => {
    // Initialize enabledCharacters state to include all characters as enabled
    const initialEnabledCharacters = {};
    data.forEach(character => {
      initialEnabledCharacters[character.name] = true;
    });
    setEnabledCharacters(initialEnabledCharacters);
  }, [data]);

  const handleToggleCharacter = (name) => {
    setEnabledCharacters(prevEnabledCharacters => ({
      ...prevEnabledCharacters,
      [name]: !prevEnabledCharacters[name]
    }));
  };

  const filteredData = data.filter(character => enabledCharacters[character.name]);

  return (
    <div className="mx-auto w-full max-w-lg">
      <h2>Character Chart</h2>
      <div className="mb-4">
        {data.map(character => (
          <label key={character.name} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600 rounded"
              checked={enabledCharacters[character.name] || false}
              onChange={() => handleToggleCharacter(character.name)}
            />
            <span className="ml-2">{character.name}</span>
          </label>
        ))}
      </div>
      <BarChart width={600} height={300} data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="comics" fill="#6366F1" />
      </BarChart>
    </div>
  );
}

export default CharacterChart;
