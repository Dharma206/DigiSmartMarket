const { createMarket, editMarket, destroyMarket, listMarkets } = require('../controllers/market');
const Joi = require('joi');

const addMarketSchema = Joi.object({
    marketName: Joi.string().required(),
    location: Joi.string().required()
});

async function addMarket(req, res) {
    try {
        const data = req.body;
        const { error, value } = addMarketSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await createMarket(data, req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function updateMarket(req, res) {
    try {
        const data = req.body;
        const { error, value } = addMarketSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await editMarket(req.params.id, data, req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function deleteMarket(req, res) {
    try {
        const result = await destroyMarket(req.params.id, req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getMarkets(req, res) {
    try {
        const result = await listMarkets(req.query.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

module.exports = {
    addMarket,
    updateMarket,
    deleteMarket,
    getMarkets
}