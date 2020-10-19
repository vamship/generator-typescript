// Update with your config settings.

import path from 'path';

const {
    MYSQL_DATABASE_NAME,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_HOST,
    MYSQL_PORT,
} = process.env;

const connection = {
    host: MYSQL_HOST || '127.0.0.1',
    database: MYSQL_DATABASE_NAME,
    user: MYSQL_USERNAME,
    port: parseInt(MYSQL_PORT || '3306', 10),
    password: MYSQL_PASSWORD,
};

const seeds = {
    directory: path.join(__dirname, 'seeds'),
};

const migrations = {
    directory: path.join(__dirname, 'migrations'),
    tableName: 'knex_migrations',
    extension: 'ts',
};

module.exports = {
    development: {
        client: 'mysql',
        connection,
        pool: {
            min: 2,
            max: 10,
        },
        seeds,
        migrations,
    },

    staging: {
        client: 'mysql',
        connection,
        pool: {
            min: 2,
            max: 10,
        },
        seeds,
        migrations,
    },

    production: {
        client: 'mysql',
        connection,
        pool: {
            min: 2,
            max: 10,
        },
        seeds,
        migrations,
    },
};
