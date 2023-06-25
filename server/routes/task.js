// Imports and Router
const express = require('express');
const pool = require('../modules/pool.js');
const taskRouter = express.Router();


// Server Routes
// GET for retrieving data from server
taskRouter.get('/', (req, res) => {
    console.log("Inside GET route '/task'");

    // Query to database
    let queryText = `SELECT * FROM "to-do-list" ORDER BY "priority" ASC;`;

    pool.query(queryText)
        .then((result) => {
            console.log("Success! Request for to-do list made!");
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error making query ${queryText}`, error);
            res.sendStatus(500);
        })

}); // end GET


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

// PUT
taskRouter.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;

    // Query to switch between completed and uncompleted
    let queryText = 
    `UPDATE "to-do-list"
    SET "completed" = NOT "completed"
    WHERE id = $1;`

    // Sending out query and param
    pool.query(queryText, [idToUpdate])
    .then((result) => {
        console.log("Task updated!", result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log("Error making database query:", error);
        res.sendStatus(500);
    })

});

// DELETE
taskRouter.delete('/:id', (req, res) => {
    // Dynamic targeting of the specific data id for deletion from database
    let idToDelete = req.params.id;

    let queryText = `DELETE FROM "to-do-list" WHERE id = $1;`;

    pool.query(queryText, [idToDelete])
    .then((result) => {
        console.log("Task deleted!", result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error sending query: ${queryText}`);
        console.log("Error is:", error);
        res.sendStatus(500)
    })

});


// Exporting router
module.exports = taskRouter;
