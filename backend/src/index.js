const server = require('./server');
// import connection from './connect';

const { PORT } = require('../config');

function main() {
  try {
    // await connection.create(MONGODB_URI);
    server.listen(PORT, () => console.log('Server is running at port ' + PORT) );
  } catch (error) {
    console.error('Error on start - ', error);
  }
}

main();