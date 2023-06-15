const express = require("express");
const {populateDB} = require("../controllers/populate");
const router = express.Router()


router
    .route('/')
    .get(populateDB)





module.exports = router;