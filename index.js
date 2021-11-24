const express = require('express'), morgan = require('morgan'), uuid = require('uuid');
const app = express();

let movies = [
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


// GET requests for the home/root page
app.get('/', (req, res) => {
    res.send('Welcome to myFlix! Your Favourite Movie Encyclopedia');
  });

// GET request for the webpage with documentaton for the Endpoints
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});
  
// GET request to return all the Top Ten Movies to the Client
app.get('/movies', (req, res) => {
    res.json(movies);
  });

// GET request to return a single movie with a specific title
app.get('/movies/:title', (req, res) => {
  let movie = movies.find((movie) => {
    return movie.title === req.params.title;
  });
  if(movie){
    res.status(200).json(movie);
  }
  else{
    res.status(400).send('No movie with this title exists in the Top Ten Movies');
  }
});

// GET request to return movies with a specific genre title
app.get('/movies/genres/:title', (req, res) => {
  res.send(`Successfull! List of Movies with ${req.params.title} Genre Title.`);
});

// GET request to return a director with a specific name
app.get('/movies/directors/:name', (req, res) => {
  let director = movies.find((movie) => {
    return movie.director === req.params.name;
});
if(director) {
    res.status(200).json(director);
} 
else {
    res.status(400).send('No director with this name exists for the Top Ten Movies');
}
});

// POST request to Add new User 
app.post('/users', (req, res) => {
  res.status(201).send(`Successfull! User Account has been Created.`);
});

//PUT request to update User details using Username as Identifier
app.put('/users/:userName', (req, res) => {
  res.status(201).send(`Successfull! Account with username: ${req.params.userName} has been updated`);
});

//POST request to Allow users to add a movie to their list of favorites 
app.post('/users/favorites/:userName/:movieTitle', (req, res) => {
  res.send(`Successfull! ${req.params.userName} added ${req.params.movieTitle} to their favourites list`);
});

//DELETE request to Allow users to add a movie to their list of favorites 
app.delete('/users/favorites/:userName/:movieTitle', (req, res) => {
  res.send(`Successfull! ${req.params.userName} removed ${req.params.movieTitle} from their favourites list`);
});


// DELETE request to Delete a User Account 
app.delete('/users/:id', (req, res) => {
  res.send(`Successfull! User with ID :${req.params.id} has been deleted.`);
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