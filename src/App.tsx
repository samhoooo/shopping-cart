import React from 'react';
import Home from './pages/home';
import ErrorFallback from './components/errorFallback';

function App() {
  return (
    <div className="App" data-testid="app">
      <Home/>
    </div>
  );
}

export default App;
