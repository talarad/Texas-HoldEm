const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.set('trust proxy', 1)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var session = require('express-session')
// app.use(session({ saveUninitialized: false, resave: false, secret: 'keyboard cat', cookie: { maxAge: 6000000000 } }))


app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.post('/', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});