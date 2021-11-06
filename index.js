const express = require('express'), morgan = require('morgan');
const app = express();

let topTenMovies = [
    {
      title: '300',
      released: 2007,
      genre: ['Action', 'Adventure', 'War'],
      director: 'Zack Synder'
    },
    {
      title: 'Gladiator',
      released: 2000,
      genre: ['Action', 'Adventure', 'Drama'],
      director: 'Ridley Scott'
    },
    {
      title: 'Body of Lies',
      released: 2008,
      genre: ['Action', 'Drama', 'Thriller'],
      director: 'Ridley Scott'
    },
    {
      title: 'Flight',
      released: 2012,
      genre: ['Drama'],
      director: 'Robert Zemeckis'
    },
    {
      title: 'Training Day',
      released: 2001,
      genre: ['Action', 'Crime', 'Drama', 'Thriller'],
      director: 'Antoine Fuqua'
    },
    {
      title: 'Shooter',
      released: 2007,
      genre: ['Action', 'Crime', 'Drama', 'Mystery', 'Thriller'],
      director: 'Antoine Fuqua'
    },
    {
      title: 'The Avengers',
      released: 2012,
      genre: ['Action', 'Adventure', 'Science Fiction'],
      director: 'Joss Whedon'
    },
    {
      title: 'Django Unchained',
      released: 2012,
      genre: ['Drama', 'Western'],
      director: 'Quentin Tarantino'
    },
    {
      title: 'Shaft',
      released: 2019,
      genre: ['Action', 'Crime'],
      director: 'Tim Story'
    },
    {
      title: 'Blood Diamond',
      released: 2006,
      genre: ['Drama', 'Thriller', 'Action'],
      director: 'Edward Zwick'
    }
  ];

app.use(morgan('common'));
app.use(express.static('public'));

// GET requests 
app.get('/', (req, res) => {
    res.send('Welcome to myFlix! Your Favourite Movie Encyclopedia');
  });

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});
  
app.get('/movies', (req, res) => {
    res.json(topTenMovies);
  });

//Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});
  
// listen for requests on port 8080
app.listen(8080, () => {
    console.log('MyFlix App is listening on port 8080.');
  });