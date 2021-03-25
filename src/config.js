require('dotenv').config()


const config = {
  DEV: process.env.NODE_ENV !== 'production',
  PORT: process.env.PORT || 3000,
  CORS: process.env.CORS,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DATABASE: process.env.DB_DATABASE,
}