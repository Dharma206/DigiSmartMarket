const { createMarketVendor, createLabourer, listLabourer, destroyLabourer } = require('../controllers/marketvendor');
const Joi = require('joi');

const requestAccessSchema = Joi.object({
    userId: Joi.number().required(),
    marketId: Joi.number().required()
});

const addLabourerSchema = Joi.object({
    name: Joi.string().required(),
    details: Joi.string().allow(null),
    cropName: Joi.string().required(),
    quantity: Joi.number().required(),
    amount: Joi.number().required()
});

async function requestAccess(req, res) {
    try {
        const data = req.body;
        const { error, value } = requestAccessSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await createMarketVendor(data);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function addLabourer(req, res) {
    try {
        const data = req.body;
        const { error, value } = addLabourerSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await createLabourer(data, req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getLabourers(req, res) {
    try {
        const result = await listLabourer(req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function deleteLabourer(req, res) {
    try {
        const result = await destroyLabourer(req.params.id);
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
    requestAccess,
    addLabourer,
    getLabourers,
    deleteLabourer
}