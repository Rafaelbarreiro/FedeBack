const express = require("express");
const {
    getEvents,
    geteventById,
    deleteEvents,
    postEvents} = require ("../controllers/events")
const router = express.Router()

router
    .route('/')
    .get(getEvents)
    .post(postEvents)
router
    .route('/:id')
    .get(geteventById)
    .delete(deleteEvents)
/* router.route('/:title')
    .put(updateEvents)
 */


module.exports = router;