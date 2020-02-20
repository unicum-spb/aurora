// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const application = require('./dist');

module.exports = application;

const options = {
  rest: {
    cors: {
      origin: '*',
      methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      maxAge: 86400,
      credentials: true,
    },
  },
};

if (require.main === module) {
  // Run the application
  try {
    application.main(options)
  } catch (error) {
    console.error('Cannot start the application.', error);
    process.exit(1);
  }
}