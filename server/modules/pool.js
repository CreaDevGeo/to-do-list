// Importing pg package
const pg = require('pg');

// Configuring connection to weekend-to-do-app database pool
const pool = new pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432
});


// Exporting database server 'weekend-to-do-app' pool
module.exports = pool;