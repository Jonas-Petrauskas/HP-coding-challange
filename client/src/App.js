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
          <div className="input">
            <input
              className="search"
              type="text" 
              placeholder="Search album name.."  
            />
          </div>
          <div className="albumsContainer">
            {albums.map(({artistName, collectionName, artworkUrl60, id }) => {
              return (
                <div className="albumName" key={collectionName+id}>
                  <img src={artworkUrl60} alt={`Album cover for ${artistName} from their album ${collectionName}`}></img>
                  <div className="collectionName">{collectionName}</div>
                </div>
              )
            }
          )}
          </div>

        </div>
  );
}

export default App;
