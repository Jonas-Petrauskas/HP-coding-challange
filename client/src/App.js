import './App.css';
import { useState, useEffect } from 'react';

function App() {
  
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/albums')
      .then((res) => res.json())
      .then((albums) => {
        setAlbums(albums)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App;
