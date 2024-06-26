const { approveVendor, listApprovals, getMarketVendors, destroyMarketVendors } = require('../controllers/marketadmin');


async function vendorApproval(req, res) {
    try {
        const result = await approveVendor(req.params.id, req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function getApprovals(req, res) {
    try {
        const result = await listApprovals(req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function listMarketVendors(req, res) {
    try {
        const result = await getMarketVendors(req.userId);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function deleteMarketVendors(req, res) {
    try {
        const result = await destroyMarketVendors(req.params.id);
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
    vendorApproval,
    getApprovals,
    listMarketVendors,
    deleteMarketVendors
}