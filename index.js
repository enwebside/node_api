const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');


const server = restify.createServer();

server.use(restify.plugins.bodyParser());



server.use(cors({
  origin: '*',
  methods: 'GET','HEAD','PUT','PATCH','POST','DELETE',
  allowedHeaders:'Content-Type','Authorization',
  preflightContinue: false,
  optionsSuccessStatus: 204
  
}));

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
