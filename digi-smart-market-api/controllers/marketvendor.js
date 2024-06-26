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
        if(!userExists) throw new error('User not exists');
        const marketExists = await models.Market.findByPk(data.marketId);
        if(!marketExists) throw new Error('Market is not present');
        const marketVendorExists = await models.MarketVendor.findOne({
            where: {
                marketId: data.marketId,
                userId: data.userId
            }
        });
        console.log(data);
        if(marketVendorExists) throw new Error('Market vendor already exists');
        const result = await models.MarketVendor.create({
            isApproved: false,
            ...data
        })
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createLabourer(data, userId) {
    try {
        const userExists = await models.User.findOne({
            where: { 
                id: userId,
                role: 'MarketVendor'
            }
        })
        if(!userExists) throw new error('User not exists');
        console.log(userExists)
        const marketVendorExists = await models.MarketVendor.findOne({ where: { userId: userExists.id} });
        if(!marketVendorExists) throw new Error('Market vendor is not present');
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
        const produce = await models.Produce.create({
            cropName: data.cropName,
            quantity: data.quantity,
            amount: data.amount,
            laborerId: laborer.id
        })
        return {
            laborer,
            produce
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function listLabourer(userId) {
    try {
        let queryObj = {};
        const userExists = await models.User.findByPk(userId);
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
            let marketVendorIds = await models.MarketVendor.findAll({
                where: { marketId },
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
        let response = result.rows.map(ele => {
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
        return {
            count: result.count,
            response
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function destroyLabourer(labourerId) {
    try {
        const laborerExists = await models.Laborer.findByPk(labourerId);
        if(!laborerExists) throw new Error('Laborer Id not exists');
        await models.Produce.destroy({where: { laborerId: laborerExists.id }})
        await models.Laborer.destroy({ where: {id: labourerId }});
        return {
            labourerId
        };
    } catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createMarketVendor,
    createLabourer,
    listLabourer,
    destroyLabourer
}