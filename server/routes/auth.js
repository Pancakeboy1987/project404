const express = require('express');
const { register, login } = require('../controllers/authController');
const {updateUser} = require('../controllers/userEditController')

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put(`/edit`,updateUser);


module.exports = router;