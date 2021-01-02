const { Pool } = require('pg')
const AWS = require('aws-sdk')

let signer = new AWS.RDS.Signer({
  // configure options
  region: 'us-east-2',
  username: 'db_user',
  hostname: 'igdb.cmxcawzmeu8f.us-east-2.rds.amazonaws.com',
  port: 5432
});

const token = signer.getAuthToken();

const pool = new Pool({
  user: 'db_user',
  host: 'igdb.cmxcawzmeu8f.us-east-2.rds.amazonaws.com',
  database: 'IGDB',
  password: token,
  port: 5432,
  ssl: { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

module.exports = {
  pool
}