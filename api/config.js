function getDatabaseConfig() {
    if (process.env.LOCAL) {
        return {
            database: 'todos',
            username: 'todoapp',
            password: 'todoapp',
            host: '127.0.0.1',
            port: '3306'
        }
    } else {
        return {
            database: process.env.PLANETSCALE_DB,
            username: process.env.PLANETSCALE_DB_USERNAME,
            password: process.env.PLANETSCALE_DB_PASSWORD,
            host: process.env.PLANETSCALE_DB_HOST,
            port: '3306',
        }
    }
}

module.exports = {
    getDatabaseConfig
}
