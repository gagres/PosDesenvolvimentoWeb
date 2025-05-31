module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            database: 'web',
            user: 'postgres',
            passsword: 'admin',
        }
    },
    migrations: {
        directory: './database/migrations',
        tableName: 'knex_migrations',
        extension: 'ts',
    },
    seeds: {
        directory: './database/seeds',
        extension: 'ts',
    },
}