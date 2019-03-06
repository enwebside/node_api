module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL : process.env.URL || 'http://localhost:3000',
    MONGODB_URI : process.env.MONGODB_URI || 'mongodb+srv://bruker:7ZJzBfvmieS4fsh@nodeapi-plyoo.mongodb.net/test?retryWrites=true',
    JWT_SECRET: process.env.JWT_SECRET || 'engodhest'


}