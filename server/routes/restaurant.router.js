const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req,res) => {

});

router.post('/', (req,res) => {
    console.log('Got to the server!');
    console.log(req.body);

    const restaurantObject = req.body;

    const queryString = `INSERT INTO restaurants (name, address, bestfood)
                    VALUES ($1,$2,$3);`;

    pool.query(queryString, [restaurantObject.name, restaurantObject.address, restaurantObject.bestfood])
        .then((response) => {
            console.log(response);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error saving to DB: ', err);
            res.sendStatus(500);
        });
});

module.exports = router;