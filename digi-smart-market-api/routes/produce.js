const { createProduce, listProduce, destroyProduce, updateProduce } = require('../controllers/produce');
const Joi = require('joi');

const addProduceSchema = Joi.object({
    cropName: Joi.string().required(),
    quantity: Joi.number().required(),
    amount: Joi.number().required(),
    details: Joi.string().allow(null, ''),
    laborerId: Joi.number().required()
});

async function addProduce(req, res) {
    try {
        const data = req.body;
        const { error, value } = addProduceSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await createProduce(data, req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getProduce(req, res) {
    try {
        const result = await listProduce(req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function deleteProduce(req, res) {
    try {
        const result = await destroyProduce(req.params.id);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function editProduce(req, res) {
    try {
        const data = req.body;
        const { error, value } = addProduceSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await updateProduce(req.params.id, data, req.userId);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}


module.exports = {
    addProduce,
    getProduce,
    deleteProduce,
    editProduce
}