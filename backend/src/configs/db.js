const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWROD,
    DB: process.env.DATABASE_NAME,
    dialect: 'mysql',
    port: process.env.DATABASE_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };