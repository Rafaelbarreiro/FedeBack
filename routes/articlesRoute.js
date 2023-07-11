const express = require("express");
const {
    getArticles,
    getarticleById,
    postArticles, 
    updateArticles, 
    deleteArticles,
    Payarticle} = require ("../controllers/articles")
const router = express.Router()

router
    .route('/')
    .get(getArticles)
    .post(postArticles)
    .put(updateArticles)
router
    .route('/:_id')
    .get(getarticleById)
    .delete(deleteArticles)
/* router.route('/:title')
    .put(updateCards)
 */
router
    .route('/buy/:id')
    .post(Payarticle)

module.exports = router;