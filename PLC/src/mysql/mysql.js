const mysql = require("mysql2");
const pool = mysql.createPool({
    host : '192.168.10.209',
    port : 3310,
    user : 'ipxnms',
    password : '$kim99bsd00',
    database : 'smartfarm_cse',
    connectionLimit : 10
})

const db = pool.promise();

module.exports = db;
