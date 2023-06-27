// Imports and Routers
// Express
const express = require('express');

// Express function
const app = express();

// Body parser
const bodyParser = require('body-parser');

// Port
const PORT = process.env.PORT || 5000;

// Router: '/task'
let taskRouter = require('./routes/task.js');


// Configurations
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

// Request to this url will route to taskRouter
app.use('/task', taskRouter);



// Server start
app.listen(port, () => {
    console.log("Up and running on port:", port);
}); // end server start
