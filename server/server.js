const express = require('express');
// Uses express to create a server app
const app = express();
// Port used for connections, written as localhost:5000/ on a client app
const PORT = 5000;

// Serves static files like INDEX.html, CLIENT.js, and so on
app.use(express.static('server/public'));

// Turns on my server and listens for connections
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});