import './App.css';
import { useState, useEffect } from 'react';

function App() {
  
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  const searchAlbums = function ({target}) {
    const temporatyFilteredAlbums = albums.filter(({collectionName}) => {
      return collectionName.toLowerCase().includes(target.value.toLowerCase())
    })
    setFilteredAlbums(temporatyFilteredAlbums);
  }

  useEffect(() => {
    fetch('http://localhost:3000/albums')
      .then((res) => res.json())
      .then((albums) => {
        setAlbums(albums)
        setFilteredAlbums(albums)
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
              onChange={searchAlbums}  
            />
          </div>
          <div className="albumsContainer">
            {filteredAlbums.map(({artistName, collectionName, artworkUrl60, id }) => {
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
