const errors = require('restify-errors');
const modelItems = require('../modules/Items');
const rjwt = require('restify-jwt-community');
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
    server.post('/items', rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
        if(!req.is('application/json')) {
            return next( new errors.InvalidContentError("Expect 'application/json'"));
        }
        const { name, email, balance } = req.body;
        
        const newItemsToModel = new modelItems({
            name,
            email,
            balance
        });

        try {
            const newItemsFromApi = newItemsToModel.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.nessage));

        }
    });
    //update
    server.put('/items/:id', rjwt({ secret: config.JWT_SECRET }),async (req, res, next) => {
        if(!req.is('application/json')) {
            return next( new errors.InvalidContentError("Expect 'application/json'"));
        }
        try {
            const updateOneItem = await modelItems.findOneAndUpdate(
                { _id : req.params.id },
                req.body
            );
            res.send(200);
            next();
        } catch (err) { 
            return next(new errors.ResourceNotFoundError(
                `Did not found items by id ${req.params.id}`
            ));
        }
    });
    //delete one
    server.del('/items/:id', rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
        try {
            const deleteOneItems = await modelItems.findOneAndDelete({ 
                _id : req.params.id 
            });
            res.send(200);
            next(); 
        } catch (err) {
            return next(new errors.ResourceNotFoundError(
                `No user by id ${req.params.id}`
            ));     
        }
    });

};