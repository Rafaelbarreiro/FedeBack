const express = require("express");
const {
    getEvents,
    geteventById,
    deleteEvents,
    postEvents,
    PayEvent} = require ("../controllers/events")
const router = express.Router()

router
    .route('/')
    .get(getEvents)
    .post(postEvents)
router
    .route('/:_id')
    .get(geteventById)
    .delete(deleteEvents)
router
    .route('/buy/:_id')
    .post(PayEvent)
/* router.route('/:title')
    .put(updateEvents)
 */   
   

module.exports = router;