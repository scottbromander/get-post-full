const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req,res) => {
    const queryString = `SELECT * FROM "restaurants-build" ORDER BY name DESC;`;

    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log('Error getting data from database: ', err);
            res.sendStatus(500);
        })
});

router.get('/:id', (req,res) => {
    const queryString = `SELECT * FROM "restaurants-build" WHERE id=$1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.send(response.rows[0]);
        })
        .catch((err) => {
            console.log('Error getting data from database: ', err);
            res.sendStatus(500);
        })
});

router.post('/', (req,res) => {
    const restaurantObject = req.body;

    const queryString = `INSERT INTO "restaurants-build" (name, address, bestfood, visited)
                    VALUES ($1,$2,$3, false);`;

    pool.query(queryString, [restaurantObject.name, restaurantObject.address, restaurantObject.bestfood])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error saving to DB: ', err);
            res.sendStatus(500);
        });
});

router.put('/:id', (req,res) => {
    const queryString = `SELECT * FROM "restaurants-build" WHERE id=$1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            updateVisited(res, response.rows[0]);
        })
        .catch((err) => {
            console.log('Error getting data from database: ', err);
            res.sendStatus(500);
        })
});

function updateVisited(res, restaurant) {
    let reqId = restaurant.id;
    let visited = (restaurant.visited == 'true') || (restaurant.visited == true);
    visited = !visited;

    const queryString = `UPDATE "restaurants-build" SET visited=$1 WHERE id=$2;`;

    pool.query(queryString, [visited, reqId])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error attempting to update: ', err);
            res.sendStatus(500);
        });
}

router.delete('/:id', (req,res) => {
    let reqId = req.params.id;
    let queryString = 'DELETE FROM "restaurants-build" WHERE id=$1;';

    pool.query(queryString, [reqId])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error deleting from database: ', err);
            res.sendStatus(500);
        });
});

module.exports = router;