import React, { useState } from 'react';

export default function Example(props) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [name, setName] = useState('cxq');
  [12,3].includes(3)
  return (
    <div>   
      <p>You clicked {count} times</p>
      <p>You clicked {name} times</p>
      <button onClick={() => setCount(count + 1)}>
        count
      </button>
      <button onClick={() => setName(name + 1)}>
        name
      </button>
    </div>
  );
}