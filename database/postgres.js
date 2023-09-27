const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    database: 'new_blog',
    password: '12345678',
    port: 5432,
    host: 'localhost'
});

module.exports = pool;