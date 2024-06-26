const models = require('../models');

async function approveVendor(marketVendorId) {
    try {
        const marketVendorExists = await models.MarketVendor.findByPk(marketVendorId);
        if(!marketVendorExists) throw new Error('MarketVendor Id not exists');
        const result = await models.MarketVendor.update({
            isApproved: true
        }, { where: {id: marketVendorId }});
        return result;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

async function listApprovals(userId) {
    try {
        const marketExists = await models.Market.findOne({
            where: { userId }
        });
        if(!marketExists) throw new Error('Market not exists');
        const result = await models.MarketVendor.findAndCountAll({ 
            where: { isApproved: false, marketId: marketExists.id },
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
        console.log(error);
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
            const marketExists = await models.Market.findOne({
                where: { userId }
            });
            if(!marketExists) throw new Error('Market not exists');
            queryObj.marketId = marketExists.id
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
        let response = result.rows.map(ele => {
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
        return {
            count: result.count,
            response
        };
    } catch(error) {
        console.log(error);
        throw error;
    }
}

async function destroyMarketVendors(marketVendorId) {
    try {
        const marketVendorExists = await models.MarketVendor.findByPk(marketVendorId);
        if(!marketVendorExists) throw new Error('MarketVendor Id not exists');
        await models.MarketVendor.destroy({ where: {id: marketVendorId }});
        return {
            marketVendorId
        };
    } catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    approveVendor,
    listApprovals,
    getMarketVendors,
    destroyMarketVendors
}