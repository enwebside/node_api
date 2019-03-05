const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {

    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true});
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
    require('./routes/items')(server);
    console.log(`Server start at port ${config.PORT}`);
});