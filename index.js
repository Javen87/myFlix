const express = require('express'), morgan = require('morgan'), uuid = require('uuid'), mongoose = require('mongoose'), Models = require('./models.js'), bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

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
    Movies.find().then((movies) => {
      res.status(201).json(movies);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
  });

// GET request to return a single movie with a specific title
app.get('/movies/:title', (req, res) => {
  Movies.findOne({Title: req.params.title}).then((movie) => {
    res.status(201).json(movie);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});
  

// GET request to return movies with a specific genre title
app.get('/movies/genres/:title', (req, res) => {
  Movies.find({'Genre.Name': req.params.title}).then((movies) => {
    res.status(201).json(movies);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

// GET request to return a director with a specific name
app.get('/movies/directors/:name', (req, res) => {
  Movies.findOne({'Director.Name': req.params.name}).then((director) => {
    res.status(201).json(director);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

// POST request to Add new User 
app.post('/users', (req, res) => {
  Users.findOne({Username: req.body.Username}).then((user) => {
    if(user){
      return res.status(400).send(`Account with Username : ${req.body.Username} already exists.`);
    }
    else{
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        EmailAddress: req.body.EmailAddress,
        Birthday: req.body.Birthday
      }).then((user) => {
        res.status(201).json(user);
      })
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + error);
  })
});

//PUT request to update User details using Username as Identifier
app.put('/users/:username', (req, res) => {
  Users.findOneAndUpdate({Username: req.params.username}, {$set: 
    {
      Username: req.body.Username,
      Password: req.body.Password,
      EmailAddress: req.body.EmailAddress,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } 
    else {
      res.json(updatedUser);
    }
  });
});

//POST request to Allow users to add a movie to their list of favorites 
app.post('/users/favorites/:username/:movieId', (req, res) => {
  Users.findOneAndUpdate({Username: req.params.username}, {$push: 
    {
      FavoriteMovies: req.params.movieId,
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, favoriteMovie) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } 
    else {
      res.json(favoriteMovie);
    }
  });
});

//DELETE request to Allow users to remove a movie to their list of favorites 
app.delete('/users/favorites/:username/:movieId', (req, res) => {
  Users.findOneAndUpdate({Username: req.params.username}, 
    {$pull: {
      FavoriteMovies: req.params.movieId,
    }
  },
  { new: true }, 
  (err, favoriteMovie) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } 
    else {
      res.json(favoriteMovie);
    }
  });
});


// DELETE request to Delete a User Account 
app.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({Username: req.params.username}).then((user) => {
    if(!user){
      res.status(400).send(`Account with Username: ${req.params.username} was not found`);
    }
    else{
      res.status(200).send(`Account with Username: ${req.params.username} has been deleted.`);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' +err);
  })
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