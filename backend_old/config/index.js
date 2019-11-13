const dotenv = require('dotenv');

dotenv.config();

const {
  MONGODB_URI,
  MONGOLAB_AMBER_URI,
  MONGOLAB_COPPER_URI,
  PROD_MONGODB,
  PORT,
  NODE_ENV
} = process.env;

module.exports = {
  MONGODB_URI,
  MONGOLAB_AMBER_URI,
  MONGOLAB_COPPER_URI,
  PROD_MONGODB,
  PORT,
  NODE_ENV
};