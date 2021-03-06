const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const corsMiddleware = require('restify-cors-middleware')

const corsx = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Content-type', 'Authorization'],
  exposeHeaders: []
});

const server = restify.createServer();




server.pre(corsx.preflight);
server.use(corsx.actual);
server.use(restify.plugins.bodyParser());



server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true});
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
    require('./routes/items')(server);
    require('./routes/user')(server);
    console.log(`Server start at port ${config.PORT}`);
});
