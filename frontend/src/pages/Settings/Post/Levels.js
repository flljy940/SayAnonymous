import React, { useState } from 'react';

const Levels = () => {
  const [community, setCommunity] = useState('');

  return (
    <div className="choose-community">
      <select
        value={community}
        onChange={(e) => setCommunity(e.target.value)}
      >
        <option value="" disabled>
          Choose a viewable level
        </option>
        <option value="level 1">Level 1</option>
        <option value="level 2">Level 2</option>
        <option value="level 3">Level 3</option>
        <option value="level 4">Level 4</option>
        <option value="level 5">Level 5</option>
        <option value="level 6">Level 6</option>
        <option value="all">Viewable to all</option>
      </select>
    </div>
  );
};

export default Levels;
