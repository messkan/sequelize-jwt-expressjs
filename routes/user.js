const express = require('express');
const router = express.Router();
const User = require('../models/User');

const getAllUsers = async () => {
    return await User.findAll();
};



router.get('/users', function(req, res) {
    getAllUsers().then(user => res.json(user));
});



module.exports = router;


