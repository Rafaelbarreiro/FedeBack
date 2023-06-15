const express = require("express");
const { sendEmailRegister } = require("../controllers/email");
const router = express.Router()

router
    .route('/register')
    .post(sendEmailRegister)

module.exports = router;