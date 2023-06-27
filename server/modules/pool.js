// Importing pg package
const pg = require('pg');

// Configuring connection to weekend-to-do-app database pool
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })
  } else {
    pool = new pg.Pool({
      host: 'localhost',
      port: 5432,
      database: 'weekend-to-do-app'
    })
  } 

  
// Exporting database server 'weekend-to-do-app' pool
module.exports = pool;