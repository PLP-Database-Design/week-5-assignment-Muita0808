// initialise dependancies or declaring the dependancies

const express = require('express'); // initialized and declared it
// EXPRESS one of the frameworks that helps handle request and responses using HTTP methods
const app = express(); //called it and stored it in app variabe.
const mysql = require ('mysql2');
const ejs = require('ejs'); // Require EJS here
const dotenv = require ('dotenv');
const cors = require('cors'); //imports cors(cross origin resource sharing) - allow or restricts access to resources from different origins


app.use(express.json()); //json() is a method 
app.use(cors());//corse() is a ethod
dotenv.config();

// connect to the database(hospital_db) using content in the .env file***  NB if it does not connect then there's nothing else you will do.

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
);

// CHECK IF DB CONNECTION WORKS AS BELOW 

db.connect((err) => {
// If the connection does not happen
if(err) return console.log("Error connecting to mySQL db", err.message);

//else when the connection is successfull
console.log(`Connected to mysql successfully as id: ${db.threadId}`);

// your code goes here
// GET METHOD GOES HERE >>>

app.set('view engine', 'ejs'); //ejs = express javascript
app.set('views', __dirname + '/views');

// data is the name of the files inside 
app.get('/data', (req, res) => {
  //retrieve data from database
  db.query('SELECT * FROM patients', (err, results) => {
   if (err){
    console.error(err);
    res.status(500).send('Error retrieving data')
   } 
   else {
    // display the patients records to the browser
    res.render('data', {results: results});
   };
  });
});



//listening to the port 3300
app.listen(process.env.PORT, () => {
console.log(`Server listening on port ${process.env.PORT}`);

//send a message to the browser
console.log('Sending message to browser...');
app.get('/', (req, res) => {
  res.send('Server started sucessfully');
})

});

});