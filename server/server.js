// Imports and Routers
// Express
const express = require('express');

// Express function
const app = express();

// Body parser
const bodyParser = require('body-parser');

// Port
const port = 5000;

// Router: '/task'
let taskRouter = require('./public/routes/task.js');


// Configurations
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));


// Request to this url will route to taskRouter
app.get('/task', taskRouter);


// Server start
app.listen(port, () => {
    console.log('listening on port', port);
})
