import React, { useState } from 'react';
import './App.css';
import { Counter } from './components/Counter/Counter';

function App() {
  const [error, setError] = useState<string>('');

  return (
    <div className="App">
      {
        <h1 className={ `${error ? 'error' : 'hide'}` }>{ error }</h1>
      }
      <Counter setError={ setError } error={ error }/>
    </div>
  );
}

export default App;
