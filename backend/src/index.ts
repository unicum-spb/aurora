import { ApplicationConfig } from '@loopback/core';

import { AuroraApplication } from './application';
import { MultipartFormDataBodyParser } from './utils/multipart-form-data-body-parser';

export { AuroraApplication, PackageInfo, PackageKey } from './application';

export async function main(options?: ApplicationConfig) {
  const app = new AuroraApplication(options);

  app.bodyParser(MultipartFormDataBodyParser);

  await app.boot();
  await app.start();

  const url = app.restServer.url;

  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
