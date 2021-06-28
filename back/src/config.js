config = {}

config.app = {
    port : process.env.APP_PORT || 8081,
    auth_secret: process.env.AUTH_SECRET || 'celso'
} 

config.mongo = {
    host : process.env.MONGO_HOST || 'localhost',
    port : process.env.MONGO_PORT || 27017,
    db : process.env.MONGO_DBNAME || 'api'
}

config.graphdb = {
    host : process.env.GRAPHDB_HOST || 'localhost',
    port : process.env.GRAPHDB_PORT || 2700,
    repo : process.env.GRAPHDB_REPO || "default"
}

config.frontend = {
    host : process.env.FRONT_HOST || 'localhost',
    port : process.env.FRONT_PORT || 8080
}

module.exports = config