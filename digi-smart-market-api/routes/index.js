const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile, resetPassword, userListing } = require('./user');
const { validateToken, checkRole } = require('../controllers/user');
const { addMarket, updateMarket, deleteMarket, getMarkets } = require('./market');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateToken, getProfile);
router.put('/profile', validateToken, updateProfile);
router.post('/reset-password', resetPassword);

router.post('/market', validateToken, addMarket);
router.put('/market/:id', validateToken, updateMarket);
router.delete('/market/:id', validateToken, deleteMarket);
router.get('/market', validateToken, getMarkets);

router.get('/users', validateToken, checkRole(['Admin']), userListing);


module.exports = router;