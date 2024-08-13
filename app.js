import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import sample from 'lodash.sample'

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'oh-so-not-meh',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];

// Display the homepage
app.get('/', (req, res) => {
  res.render('index.html');
});

// Display a form that asks for the user's name.
app.get('/hello', (req, res) => {
  res.render('hello.html');
});


let name;
// Handle the form from /hello and greet the user.
app.get('/greet', (req, res) => {
  
  name = req.query.name || 'stranger';
  const compliment = sample(COMPLIMENTS);
  res.render('greet.html.njk', { 
    name: name, 
    compliment: compliment,
 });
});

// See if the person wants to play. If so, take them to the game page. 
// If not, take them to the goodbye page.
app.get("/game", (req, res) => {
  const play = req.query.play;
  
  if (play === "no") {
    res.render("goodbye.html.njk", {
      name: name,
    });
  } else {
    res.render("game.html.njk");
  }
});

// Display the results the user input from the game page on the madlib page.
app.get("/madlib", (req, res) => {
  const {person, color, noun, adjective} = req.query;

  res.render("madlib.html.njk", {
    person: person,
    color: color, 
    noun: noun,
    adjective: adjective,
  });
});
