const User = require("../Models/User");

const createUser = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    let savedTour = await newTour.save();
    console.log("Tour info inserted successfully");

    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: savedTour,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

const getAllUsers = async (req, res) => {

  try {
    const users = await User.find({})

    res.status(200).json({
      success: true,
      message: "Succesfully",
      data: users,
    });
  } catch (err) {
    res.status(400).json({ sucess: false, message: "Failed to fetch" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the User by ID
    const user = await User.findById(id);

    // If User is not found, return an error response
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Send the fetched User as a response
    res.json({ success: true, user });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching single User:", error);
    res
      .status(400)
      .json({ success: false, error: "Invalid data or error fetching User" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    // Check if a new photo file is included in the request
    if (req.file) {
      updateData = { ...updateData, photo: req.file.filename };
    }

    // Find the User by ID and update it
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    // If User is not found, return an error response
    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Send the updated User as a response
    res.json({ success: true, updatedUser });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error updating User:", error);
    res
      .status(400)
      .json({ success: false, error: "Invalid data or error updating User" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the User by ID and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    // If User is not found, return an error response
    if (!deletedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Get the count of remaining users using the getUserCount function
    const userCount = await getUserCount();

    // Send a success message with the count of remaining users
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error deleting User:", error);
    res.status(400).json({ success: false, error: "Invalid data or error deleting User" });
  }
};

const getUserCount = async (req, res) => {
  try {
    const userCount = await User.estimatedDocumentCount();
    res.status(200).json({ success: true, data: userCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
};


module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserCount,
};
