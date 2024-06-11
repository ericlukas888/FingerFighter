import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [tokens, setTokens] = useState(0);
  const [hamsterLevel, setHamsterLevel] = useState(1);

  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const earnTokens = () => {
    setTokens(tokens + 1);
  };

  const upgradeHamster = () => {
    if (tokens >= hamsterLevel * 10) {
      setTokens(tokens - hamsterLevel * 10);
      setHamsterLevel(hamsterLevel + 1);
    }
  };

  return (
    <div className="App">
      <h1>Hamster Kombat Clone</h1>
      <div>
        <p>Tokens: {tokens}</p>
        <p>Hamster Level: {hamsterLevel}</p>
        <button onClick={earnTokens}>Earn Tokens</button>
        <button onClick={upgradeHamster}>Upgrade Hamster</button>
      </div>
    </div>
  );
}

export default App;
