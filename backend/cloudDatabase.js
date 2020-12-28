const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'igdb_postgres',
  host: 'igdb.cmxcawzmeu8f.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Uzumakinaruto220.',
  port: 5432,
})


const client = new Client({
  user: 'igdb_postgres',
  host: 'igdb.cmxcawzmeu8f.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Uzumakinaruto220.',
  port: 5432,
})

client.connect()
client.query('SELECT * FROM DEVELOPER;', (err, res) => {
    if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows)
      }
  client.end()
})

// module.exports = {
//     client,
//     pool
// }
