const models = require('../models');
const Op = require('sequelize').Op;

async function createMarket(data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) throw new Error('User not exists');
        const marketExists = await models.Market.findOne({ 
            where: { 
                marketName: data.marketName,
                location: data.location
            }
        });
        if(marketExists) throw new Error('Market already exists');
        const market = await models.Market.create({
            userId: userId,
            ...data
        });
        return market

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function editMarket(marketId, data, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) throw new Error('User not exists');
        const marketExists = await models.Market.findByPk(marketId)
        if(!marketExists) throw new Error('Market not exists');
        const market = await models.Markets.update(data, { where: { id: marketId }});
        return market

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function destroyMarket(marketId, userId) {
    try {
        const userExists = await models.User.findByPk(userId);
        if(!userExists) throw new Error('User not exists');
        const marketExists = await models.Markets.findByPk(marketId)
        if(!marketExists) throw new Error('Market not exists');
        await models.Markets.destroy({ where: { id: marketId }});
        return marketId

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function listMarkets(userId) {
    try {
        let queryObj = {}
        if (userId !== undefined) {
            const userExists = await models.User.findByPk(userId);
            if(!userExists) throw new Error('User not exists');
            queryObj.userId = userId
        }
        const markets = await models.Markets.findAndCountAll({ where: queryObj });
        return markets

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createMarket,
    editMarket,
    destroyMarket,
    listMarkets
}