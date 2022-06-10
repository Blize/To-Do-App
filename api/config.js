const cfEnv = require('cfenv'); // Cloud Foundry Environment Helpers

const appEnv = cfEnv.getAppEnv()

function getDatabaseConfig() {
    if (appEnv.isLocal) {
        return {
            database: 'todos',
            username: 'todoapp',
            password: 'todoapp',
            host: '127.0.0.1',
            port: '3306'
        }
    } else {
        const dbService = appEnv.getService('tadmama5-database')
        return {
            database: dbService.credentials.database,
            username: dbService.credentials.username,
            password: dbService.credentials.password,
            host: dbService.credentials.host,
            port: dbService.credentials.port,
        }
    }
}

module.exports = {
    getDatabaseConfig
}
