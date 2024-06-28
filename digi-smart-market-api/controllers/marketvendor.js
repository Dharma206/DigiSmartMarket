const logger = require('../helpers/logger');
const models = require('../models');
const Op = require('sequelize').Op;

async function createMarketVendor(data) {
    try {
        const userExists = await models.User.findOne({
            where: { 
                id: data.userId,
                role: 'MarketVendor'
            }
        })
        if(!userExists) {
            logger.error('User not exists')
            throw new error('User not exists');
        }
        const marketExists = await models.Market.findByPk(data.marketId);
        if(!marketExists) {
            logger.error('Market is not present')
            throw new Error('Market is not present');
        }
        const marketVendorExists = await models.MarketVendor.findOne({
            where: {
                marketId: data.marketId,
                userId: data.userId
            }
        });
        if(marketVendorExists) throw new Error('Market vendor already exists');
        const result = await models.MarketVendor.create({
            isApproved: false,
            ...data
        })
        logger.info('Market vendor created successfully')
        return result;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function createLabourer(data, userId) {
    try {
        logger.info(`UserId for createLaborer ${userId}`)
        const userExists = await models.User.findOne({
            where: { 
                id: userId,
                role: 'MarketVendor'
            }
        })
        if(!userExists) throw new error('User not exists');
        const marketVendorExists = await models.MarketVendor.findOne({ where: { userId: userExists.id} });
        if(!marketVendorExists) {
            logger.error('Market vendor is not present')
            throw new Error('Market vendor is not present');
        }
        const labourerExists = await models.Laborer.findOne({
            where: {
                marketVendorId: marketVendorExists.id,
                name: data.name
            }
        });
        if(labourerExists) throw new Error('Laborer already exists');
        const laborer = await models.Laborer.create({
            marketVendorId: marketVendorExists.id,
            name: data.name,
            details: data.details
        })
        logger.info('Laborer created successfully')
        const produce = await models.Produce.create({
            cropName: data.cropName,
            quantity: data.quantity,
            amount: data.amount,
            laborerId: laborer.id
        })
        logger.info('Produce created successfully')
        return {
            laborer,
            produce
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}


async function listLabourer(userId) {
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
            queryObj.marketVendorId = {
                [Op.in]: marketVendorIds
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
            queryObj.marketVendorId = {
                [Op.in]: marketVendorIds
            }
        }
        if(!userExists) throw new error('User not exists');
        const result = await models.Laborer.findAndCountAll({ 
            where: queryObj,
            include: [
                {
                    model: models.MarketVendor,
                    attributes: ['id'],
                    include: [
                        {
                            model: models.User,
                            as: 'marketVendor',
                            attributes: ['id', 'userName', 'email']
                        },
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
                        }
                    ]
                },
                {
                    model: models.Produce
                }
            ]
        });
        logger.info('Query fetching done in listLabourer')
        let response;
        if (result.count > 0) {
            response = result.rows.map(ele => {
                return ({
                    id: ele.id,
                    marketVendorId: ele.marketVendorId,
                    name: ele.name,
                    details: ele.details,
                    createdAt: ele.createdAt,
                    updatedAt: ele.updatedAt,
                    marketAdmin: ele.MarketVendor.Market.marketAdmin,
                    market: {
                        id: ele.MarketVendor.Market.id,
                        marketName: ele.MarketVendor.Market.marketName,
                        location: ele.MarketVendor.Market.location,
                    },
                    marketVendor: {
                        id: ele.MarketVendor.marketVendor.id,
                        userName: ele.MarketVendor.marketVendor.userName,
                        email: ele.MarketVendor.marketVendor.email
                    },
                    produce: ele.Produces
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

async function destroyLabourer(labourerId) {
    try {
        const laborerExists = await models.Laborer.findByPk(labourerId);
        if(!laborerExists) throw new Error('Laborer Id not exists');
        await models.Produce.destroy({where: { laborerId: laborerExists.id }})
        logger.info('Produce deleted successfully')
        await models.Laborer.destroy({ where: {id: labourerId }});
        logger.info('Labourer deleted successfully')
        return {
            labourerId
        };
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    createMarketVendor,
    createLabourer,
    listLabourer,
    destroyLabourer
}