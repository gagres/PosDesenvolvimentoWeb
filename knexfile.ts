import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
        host: 'localhost',
        database: 'web',
        user: 'postgres',
        password: 'admin',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './seeds',
      extension: 'ts'
    }
  },
};

export default config;
