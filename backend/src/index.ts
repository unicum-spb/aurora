import { AuroraApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { AuroraApplication, PackageInfo, PackageKey } from './application';
import { MultipartFormDataBodyParser } from './utils/multipart-form-data-body-parser';

export async function main(options?: ApplicationConfig) {
  const app = new AuroraApplication(options);
  app.bodyParser(MultipartFormDataBodyParser);

  await app.boot();
  await app.start();

  const { url } = app.restServer;

  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}