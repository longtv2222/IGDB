const { Pool, Client } = require('pg')
const AWS = require('aws-sdk')

const signInAWS = () => {
  return new AWS.RDS.Signer({
    // configure options
    region: 'us-east-2',
    username: 'db_user',
    hostname: 'igdb.cmxcawzmeu8f.us-east-2.rds.amazonaws.com',
    port: 5432
  });
}


const clientConnection = (token) => {
  return new Client({
    user: 'db_user',
    host: 'igdb.cmxcawzmeu8f.us-east-2.rds.amazonaws.com',
    database: 'IGDB',
    password: token,
    port: 5432,
    ssl: { rejectUnauthorized: false },
  })
}

const poolConnection = (token) => {
  return new Pool({
    user: 'db_user',
    host: 'igdb.cmxcawzmeu8f.us-east-2.rds.amazonaws.com',
    database: 'IGDB',
    password: token,
    port: 5432,
    ssl: { rejectUnauthorized: false },
  })
}

module.exports = {
  signInAWS, clientConnection, poolConnection
}