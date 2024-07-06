const logger = require('../helpers/logger');
const models = require('../models');
const Op = require('sequelize').Op;

async function createProduce(data, userId) {
    try {
        logger.info(`UserId for createLaborer ${userId}`)
        const userExists = await models.User.findOne({
            where: { 
                id: userId,
                role: 'MarketVendor'
            }
        })
        if(!userExists) throw new error('User not exists');
        
        const labourerExists = await models.Laborer.findByPk(data.laborerId);
        if(!labourerExists) throw new Error('Laborer already exists');

        const produce = await models.Produce.create({
            cropName: data.cropName,
            quantity: data.quantity,
            amount: data.amount,
            details: data.details,
            laborerId: data.laborerId
        })
        logger.info('Produce created successfully')
        return {
            produce
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}


async function listProduce(userId) {
    try {
        let queryObj = {};
        const userExists = await models.User.findByPk(userId);
        logger.info(`Role of the user in listLabourer is ${userExists.role} `)


        if (userExists.role === 'MarketVendor') {
            let marketVendorIds = await models.MarketVendor.findAll({
                where: { userId },
                attributes: ['id']
            })
            marketVendorIds = marketVendorIds.map(ele => ele.id)
            let laborerIds = await models.Laborer.findAll({
                where: { marketVendorId: {
                    [Op.in]: marketVendorIds
                } },
                attributes: ['id']
            })
            laborerIds = laborerIds.map(ele => ele.id)
            queryObj.laborerId = {
                [Op.in]: laborerIds
            }
        }
        if (userExists.role === 'MarketAdmin') {
            let marketId = await models.Market.findOne({
                where: { userId }
            })
            console.log(marketId.id)
            let marketVendorIds = await models.MarketVendor.findAll({
                where: { marketId: marketId.id },
                attributes: ['id']
            })
            marketVendorIds = marketVendorIds.map(ele => ele.id)
            let laborerIds = await models.Laborer.findAll({
                where: { marketVendorId: {
                    [Op.in]: marketVendorIds
                } },
                attributes: ['id']
            })
            laborerIds = laborerIds.map(ele => ele.id)
            queryObj.laborerId = {
                [Op.in]: laborerIds
            }
        }
        if(!userExists) throw new error('User not exists');

        const result = await models.Produce.findAndCountAll({ 
            where: queryObj,
            include: [
                {
                    model: models.Laborer,
                    attributes: ['id', 'name', 'details', 'code', 'phoneNumber'],
                    include: [
                        {
                            model: models.MarketVendor,
                            attributes: ['id'],
                            include: [
                                {
                                    model: models.Market,
                                    attributes: ['id', 'marketName', 'location'],
                                    include: [
                                        {
                                            model: models.User,
                                            as: 'marketAdmin',
                                            attributes: ['id', 'userName', 'email']
                                        }
                                    ]
                                },
                                {
                                    model: models.User,
                                    as: 'marketVendor',
                                    attributes: ['id', 'userName', 'email']
                                }
                                
                            ]
                        },
                    ]
                }
            ]
        });
        logger.info('Query fetching done in listProduce')
        let response;
        if (result.count > 0) {
            response = result.rows.map(ele => {
                return ({
                    id: ele.id,
                    cropName: ele.cropName,
                    quantity: ele.quantity,
                    amount: ele.amount,
                    details: ele.details,
                    createdAt: ele.createdAt,
                    updatedAt: ele.updatedAt,
                    Laborer: {
                        id: ele.Laborer.id,
                        name: ele.Laborer.name,
                        details: ele.Laborer.details,
                        code: ele.Laborer.code,
                        phoneNumber: ele.Laborer.phoneNumber
                    },
                    marketAdmin: ele.Laborer.MarketVendor.Market.marketAdmin,
                    market: {
                        id: ele.Laborer.MarketVendor.Market.id,
                        marketName: ele.Laborer.MarketVendor.Market.marketName,
                        location: ele.Laborer.MarketVendor.Market.location,
                    },
                    marketVendor: ele.Laborer.MarketVendor.marketVendor
                })
            })
        }
        
        return {
            count: result.count,
            response
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function destroyProduce(produceId) {
    try {
        const produceExists = await models.Produce.findByPk(produceId);
        if(!produceExists) throw new Error('Produce Id not exists');
        await models.Produce.destroy({where: { id: produceId }})
        logger.info('Produce deleted successfully')
        
        return {
            produceId
        };

    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function updateProduce(produceId, data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) {
            logger.error('User not exists')
            throw new Error('User not exists');
        }
        const produceExists = await models.Produce.findByPk(produceId)
        if(!produceExists) {
            logger.error('Produce not exists')
            throw new Error('Produce not exists');
        }
        const produce = await models.Produce.update(data, { where: { id: produceId }});
        return produce

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    createProduce,
    destroyProduce,
    listProduce,
    updateProduce
}
