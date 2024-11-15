import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api').then(response => response.json())
    .then(data => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>Message from Backend:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
