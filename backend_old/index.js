const server = require('./server');
// import connection from './connect';

const { PORT } = require('./config');

function main() {
  try {
    // await connection.create(MONGODB_URI);
    server.listen(3000, () => console.log('Server is running at port ' + 3000) );
  } catch (error) {
    console.error('Error on start - ', error);
  }
}

main();