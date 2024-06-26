const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile, resetPassword, userListing } = require('./user');
const { validateToken, checkRole } = require('../controllers/user');
const { addMarket, updateMarket, deleteMarket, getMarkets } = require('./market');
const { requestAccess, addLabourer, getLabourers, deleteLabourer } = require('./marketvendor');
const { vendorApproval, getApprovals, listMarketVendors, deleteMarketVendors } = require('./marketadmin');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateToken, getProfile);
router.put('/profile', validateToken, updateProfile);
router.post('/reset-password', resetPassword);

router.post('/market', validateToken, checkRole(['MarketAdmin']), addMarket);
// router.put('/market/:id', validateToken, checkRole(['MarketAdmin']), updateMarket);
// router.delete('/market/:id', validateToken, checkRole(['MarketAdmin']), deleteMarket);
router.get('/market', validateToken, getMarkets);

router.post('/request-access', requestAccess);
router.put('/vendor-approval/:id', validateToken, checkRole(['MarketAdmin']), vendorApproval)
router.get('/vendor-approval', validateToken, checkRole(['MarketAdmin']), getApprovals)

// API to list all market vendors
router.get('/market-vendors', validateToken, checkRole(['MarketAdmin', 'Admin']), listMarketVendors);
router.delete('/market-vendors/:id', validateToken, checkRole(['MarketAdmin']), deleteMarketVendors);

router.post('/labourer', validateToken, checkRole(['MarketVendor']), addLabourer);
router.get('/labourer', validateToken, getLabourers);
router.delete('/labourer/:id', validateToken, checkRole(['MarketVendor']), deleteLabourer)

router.get('/users', validateToken, checkRole(['MarketAdmin']), userListing);


module.exports = router;