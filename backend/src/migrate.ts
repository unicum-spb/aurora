import { Scalars } from '@/types';

import { AuroraApplication } from './application';

export async function migrate(args: Array<Scalars['String']>) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema) - ', existingSchema);

  const app = new AuroraApplication();
  await app.boot();
  await app.migrateSchema({ existingSchema });

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}


try {
  migrate(process.argv);
} catch (error) {
  console.error('Cannot migrate database schema - ', error);
  process.exit(1);
}
