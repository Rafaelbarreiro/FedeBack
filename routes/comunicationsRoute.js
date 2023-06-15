const express = require("express");
const {getAllComunications, getComunicationById, postComunication, deleteComunication} = require ("../controllers/comunications")
const router = express.Router()

router
    .route('/')
    .get(getAllComunications)
    .post(postComunication)
router
    .route('/:id')
    .get(getComunicationById)
    .delete(deleteComunication)
/* router.route('/:title')
    .put(updateCards)
 */


module.exports = router;