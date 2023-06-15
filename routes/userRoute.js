const express = require("express");
const {getUsers, postUser, getUserById, updateUser, deleteUser} = require("../controllers/users");
const router = express.Router()


router
    .route('/')
    .get(getUsers)
    .post(postUser)
router.route('/:email')
    .get(getUserById)

router
    .route('/:id')
    .delete(deleteUser)
    .put(updateUser)

module.exports = router;