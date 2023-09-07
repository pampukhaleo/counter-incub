import React from 'react';
import './App.css';
import { FirstCounterContainer } from './components/Counters/FirstCounter/FirstCounterContainer';
import { SecondCounterContainer } from './components/Counters/SecondCounter/SecondCounterContainer';

function App() {

  return (
    <div className="App">
      <FirstCounterContainer />
      <SecondCounterContainer />
    </div>
  );
}

export default App;
