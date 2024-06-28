const logger = require('../helpers/logger');
const models = require('../models');
const sendEmailToUser = require('../helpers/sendMail')
const Op = require('sequelize').Op;

async function approveVendor(marketVendorId, userId) {
    try {
        const marketVendorExists = await models.MarketVendor.findByPk(marketVendorId);
        if(!marketVendorExists) throw new Error('MarketVendor Id not exists');
        const result = await models.MarketVendor.update({
            isApproved: true
        }, { where: {id: marketVendorId }});
        await sendEmailToUser(marketVendorExists.userId)
        return result;
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function listApprovals(userId) {
    try {
        let marketExists = await models.Market.findAll({
            where: { userId }
        });
        marketExists = marketExists.map(ele => ele.id)
        const result = await models.MarketVendor.findAndCountAll({ 
            where: { isApproved: false, 
                marketId: {
                    [Op.in]: marketExists
                } 
            },
            include: [
                {
                    model: models.Market,
                    attributes: ['marketName', 'location']
                },
                {
                    model: models.User,
                    as: 'marketVendor',
                    attributes: ['userName', 'email']
                }
            ]
        });
        return result;
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function getMarketVendors(userId) {
    try {
        let queryObj = {
            isApproved: true
        }
        const userExists = await models.User.findByPk(userId);
        if (userExists.role === 'MarketAdmin') {
            let marketExists = await models.Market.findAll({
                where: { userId }
            });
            marketExists = marketExists.map(ele => ele.id)
            queryObj.marketId = {
                [Op.in]: marketExists
            }
        }
        
        const result = await models.MarketVendor.findAndCountAll({ 
            where: queryObj,
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
        });
        let response;
        if (result.count > 0) {
            response = result.rows.map(ele => {
                return ({
                    id: ele.id,
                    isApproved: ele.isApproved,
                    createdAt: ele.createdAt,
                    updatedAt: ele.updatedAt,
                    market: {
                        id: ele.Market.id,
                        marketName: ele.Market.marketName,
                        location: ele.Market.location
                    },
                    marketAdmin: ele.Market.marketAdmin,
                    marketVendor: ele.marketVendor
                })
            })
        }
        return {
            count: result.count,
            response
        };
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

async function destroyMarketVendors(marketVendorId) {
    try {
        const marketVendorExists = await models.MarketVendor.findByPk(marketVendorId);
        if(!marketVendorExists) throw new Error('MarketVendor Id not exists');
        let laborerExists = await models.Laborer.findAll({ where: { marketVendorId } })
        laborerExists = laborerExists.map(ele => ele.id)
        await models.Produce.destroy({ where: { laborerId: {
            [Op.in]: laborerExists
        }}})
        await models.Laborer.destroy({ where: { marketVendorId : marketVendorId }})
        await models.MarketVendor.destroy({ where: {id: marketVendorId }});
        return {
            marketVendorId
        };
    } catch(error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    approveVendor,
    listApprovals,
    getMarketVendors,
    destroyMarketVendors
}