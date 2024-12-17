const Booking = require("../Models/Booking");


//create new booking
const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ success: true, message: "Please fill the details" });
  }
};


//get single bookimg
const getBooking = async (req, res) => {
  const userId = req.params.id; // Use the user ID from the request parameters
  try {
    const book = await Booking.find({ userId }); // Find booking with matching userId
    res.status(200).json({
      success: true,
      message: "successful",
      data: book,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};


//get All bookimg
const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({
      success: true,
      message: "Successful",
      data: books,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Set appropriate message based on the status
    let message;
    if (status === 'accepted') {
      message = 'Your tour booking is confirmed.';
    } else if (status === 'rejected') {
      message = 'Your tour booking is canceled.';
    } else {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    // Update booking status and message
    booking.status = status;
    booking.message = message;
    await booking.save();

    res.status(200).json({
      success: true,
      message: message,
      data: booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const getBookingCount = async (req, res) => {
  try {
    const bookingCount = await Booking.estimatedDocumentCount();
    res.status(200).json({ success: true, data: bookingCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
};

module.exports = {
  updateBookingStatus,
  createBooking,
  getBooking,
  getAllBooking,
  getBookingCount
};
