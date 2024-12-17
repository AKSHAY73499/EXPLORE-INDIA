const express = require("express");
const { createBooking, getBooking, getAllBooking, updateBookingStatus, getBookingCount } = require("../controllers/booking_controller");
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

// Routes that require user authentication
router.post('/', createBooking);
router.get('/:id', getBooking);

// Route that does not require user authentication
router.get('/',getAllBooking);
router.put('/:id',verifyAdmin,updateBookingStatus)
router.get ('/bookingCount/count',verifyAdmin,getBookingCount)

module.exports = router;
