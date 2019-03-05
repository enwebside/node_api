const errors = require('restify-errors');
const modelItems = require('../modules/Items');
const config = require('../config');

module.exports = server => {

    //get all
    server.get('/items', async(req, res, next) => {
       try {
            const getAllItems = await modelItems.find({});
            res.send(getAllItems);
            next();
       } catch (err) {
            return next( new errors.InvalidContentError(err));
       }
    });
    //get one
    server.get('/items/:id', async(req, res, next) => {
        try {
            const getOneItems = await modelItems.findById(req.params.id);
            res.send(getOneItems);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(
                `Dont find any items whit id of ${req.params.id}`
            ));
        }
    });
    //add one
    server.post('/items', async(req, res, next) => {
        if(!req.is('application/json')) {
            return next( new errors.InvalidContentError("Expect 'application/json'"));
        }
        const { name, email, balance } = req.body;
        
        
        try {

        } catch (err) {

        }
    });
};