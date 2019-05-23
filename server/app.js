const express = require('express');
const app = express();
const axios = require('axios');
const morgan = require('morgan');
app.use(morgan('dev'));

var cache = {};

app.get('/', (req, res) => {

  const movieId = req.query.i;
  const movieTitle = encodeURIComponent(req.query.t);

  if (movieId) {
    if (cache.hasOwnProperty(movieId)) {
      res.json(cache[movieId]);
      console.log('MovieId was sent from the cache.');
    } else { 
      axios
        .get(`http://www.omdbapi.com/?i=${movieId}&apikey=8730e0e`)
        .then(response => {
          cache[movieId] = response.data;
          res.json(cache[movieId]);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  } else if (movieTitle) {
    if (cache.hasOwnProperty(movieTitle)) {
      res.json(cache[movieTitle]);
    } else {
      axios
        .get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=8730e0e`)
        .then(response => {
          cache[movieTitle] = response.data;
          res.json(cache[movieTitle]);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }

});
//export the express application
module.exports = app;            