// Imports and Router
const express = require('express');
const pool = require('../modules/pool.js');
const taskRouter = express.Router();


// Server Routes
// GET for retrieving data from server
taskRouter.get('/', (req, res) => {
    console.log("Inside GET route '/task'");

    // Query to database
    let queryText = `SELECT * FROM "to-do-list" ORDER BY "priority" AND "id" ASC;`;

    pool.query(queryText)
        .then((result) => {
            console.log("Success! Request for to-do list made!");
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error making query ${queryText}`, error);
            res.sendStatus(500);
        })

}); // end GET

// // PUT
// taskRouter.put('/', (req, res) => {

// });

// // POST
taskRouter.post('/', (req, res) => {
    // Logging
     console.log("Inside POST '/', req.body:", req.body);

    // task object (now req.body) sent from client reassigned as variables
    let task = req.body.task;
    let priority = req.body.priority;
    let dueDate = req.body.dueDate;


    // Query for database
    let queryText = 
    `INSERT INTO "to-do-list" ("task", "priority", "due_date")
    VALUES ($1, $2, $3);`;

    // Use pool to send query
    pool.query(queryText, [task, priority, dueDate])
    .then((result) => {
        console.log("Great, you sent the task to the database!", result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error sending query: ${queryText}`, error);
        res.sendStatus(500);
    })

});

// // DELETE
// taskRouter.delete('/', (req, res) => {

// });













// Exporting router
module.exports = taskRouter;
