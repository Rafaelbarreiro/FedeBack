 const express = require("express");
const {postDonation, getDonations, PayDonation} = require ("../controllers/donation")
const router = express.Router()

router
    .route('/')
    .post(postDonation)
    .get(getDonations)
router
    .route('/donate')
    .post(PayDonation)


module.exports = router; 