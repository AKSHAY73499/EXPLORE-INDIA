const express =require("express");
const { createReview } = require("../controllers/review_controller");
const {verifyUser}=require('../utils/verifyToken');

const router =express.Router()

router.post('/:tourId',createReview)

module.exports = router;