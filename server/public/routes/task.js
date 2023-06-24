// Imports and Router
const { error } = require('console');
const express = require('express');
const pool = require('pg');
const taskRouter = express.Router();


// Server Routes
// GET for retrieving data from server
taskRouter.get('/', (req, res) => {
    console.log("Inside GET route '/task'");

    let query = `SELECT * FROM "to-do-list";`;

    pool.query(query)
        .then((result) => {
            console.log("Success! Request for to-do list made!");
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error making query ${query}`, error);
            res.sendStatus(500);
        })

}); // end GET

// PUT
taskRouter.put('/', (req, res) => {

});

// POST
taskRouter.post('/', (req, res) => {

});

// DELETE
taskRouter.delete('/', (req, res) => {

});













// Exporting router
module.exports = taskRouter;
