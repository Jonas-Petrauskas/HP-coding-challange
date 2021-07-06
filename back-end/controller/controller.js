const axios = require('axios');

exports.getAll = async (req, res) => {
  try {
    axios.get('https://itunes.apple.com/search?term=jefferson+airplane&entity=album')
    .then(function ({data}) {
      const result = filteredResults(data.results);
      res.status(201);
      res.send(result);
    })
  } catch (err) {
    res.status(500);
    res.send('Failed to access iTunes API');
  }
};

function filteredResults (unfilteredResults) {
  const results = [];
  const albumNames = [];

  for (const album of unfilteredResults) {
    const albumName = album.collectionName;
    const isDuplicateAlbumName = albumNames.includes(albumName);

    if (!isDuplicateAlbumName) {
      albumNames.push(albumName);
      results.push(album);
    }
  }
  return results
};