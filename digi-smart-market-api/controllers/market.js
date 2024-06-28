const logger = require('../helpers/logger');
const models = require('../models');
const Op = require('sequelize').Op;

async function createMarket(data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) {
            logger.error('User not exists')
            throw new Error('User not exists');
        }
        const marketExists = await models.Market.findOne({ 
            where: { 
                marketName: data.marketName,
                location: data.location
            }
        });
        if(marketExists) {
            logger.error('Market already exists')
            throw new Error('Market already exists');
        }
        const market = await models.Market.create({
            userId: userId,
            ...data
        });
        return market

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function editMarket(marketId, data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) {
            logger.error('User not exists')
            throw new Error('User not exists');
        }
        const marketExists = await models.Market.findByPk(marketId)
        if(!marketExists) {
            logger.error('Market not exists')
            throw new Error('Market not exists');
        }
        const market = await models.Market.update(data, { where: { id: marketId }});
        return market

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function destroyMarket(marketId, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) {
            logger.error('User not exists')
            throw new Error('User not exists');
        }
        const marketExists = await models.Market.findByPk(marketId)
        if(!marketExists) {
            logger.error('Market not exists')
            throw new Error('Market not exists');
        }
        let marketVendorExists = await models.MarketVendor.findAll({ where: {marketId: marketExists.id }})
        marketVendorExists = marketVendorExists.map(ele => ele.id)
        let laborerExists = await models.Laborer.findAll({ where: { marketVendorId: {
            [Op.in]: marketVendorExists
        } } })
        laborerExists = laborerExists.map(ele => ele.id)
        await models.Produce.destroy({ where: { laborerId: {
            [Op.in]: laborerExists
        }}})
        await models.Laborer.destroy({ where: { marketVendorId: {
            [Op.in]: marketVendorExists
        } } })
        await models.MarketVendor.destroy({ where: { id: {
            [Op.in]: marketVendorExists
        } } });
        await models.Market.destroy({ where: { id: marketId }});
        return marketId

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function listMarkets(userId) {
    try {
        let queryObj = {}
        if (userId !== undefined) {
            const userExists = await models.User.findByPk(userId);
            if(!userExists) {
                logger.error('User not exists');
                throw new Error('User not exists');
            }
            queryObj.userId = userId
        }
        console.log(queryObj)
        const markets = await models.Market.findAndCountAll({ where: queryObj });
        return markets

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    createMarket,
    editMarket,
    destroyMarket,
    listMarkets
}