const express = require('express');
// Uses express to create a server app
const app = express();

const bodyParser = require('body-parser');
// Port used for connections, written as localhost:5000/ on a client app
const PORT = 5000;
// Imports the router we created custom for '/restaurant' routes
const restaurantRouter = require('./routes/restaurant.router');

// Upgrading our server to get able to get JSON and other data,
// and store it in req.body throughout the app.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serves static files like INDEX.html, CLIENT.js, and so on
app.use(express.static('server/public'));

// Anytime the client makes a '/restaurant' request use this router.
app.use('/restaurant', restaurantRouter);

// Turns on my server and listens for connections
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});