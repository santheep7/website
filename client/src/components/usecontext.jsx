import React, { createContext, useContext } from 'react';
// create a context
const ThemeContext = createContext("light");

export default function Example() {
  return (
    // provide value 
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <Button />
    </div>
  );
}

function Button() {
    // using the context
  const theme = useContext(ThemeContext);
  return (
    <button style={{ padding: "8px" }}>
      The theme is {theme}
    </button>
  );
}
