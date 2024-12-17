const Tour = require("../Models/Tour");

const createTour = async (req, res) => {
  try {
    const { title, state, address, desc, price, maxGroupSize, featured } =
      req.body;
    const photo = req.file.filename;
    const newTour = new Tour({
      title,
      state,
      address,
      photo,
      desc,
      price,
      maxGroupSize,
      featured,
    });

    let savedTour = await newTour.save();
    console.log("Tour info inserted successfully");

    res.status(200).json({
      success: true,
      message: "Tour Created Successfully",
      data: savedTour,
    });
  } catch (err) {
    console.error("Error creating tour:", err);
    res.status(500).json({ success: false, message: "Failed to create tour" });
  }
};

const getAllTours = async (req, res) => {
  // Parse the page parameter from the request
  const page = parseInt(req.query.page);

  try {
    // Fetch tours from the database, populate reviews, paginate the results
    const tours = await Tour.find({})
      .skip(page * 12)
      .limit(12)
      .populate("reviews");

    // Send a successful response with the fetched tours
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    // Handle errors, send an error response
    console.error(err);
    res.status(400).json({ success: false, message: "Failed to fetch" });
  }
};
const getAllToursForAdmin = async (req, res) => {
  // Parse the page parameter from the request
  const page = parseInt(req.query.page);

  try {
    // Fetch tours from the database, populate reviews, paginate the results
    const tours = await Tour.find({});

    // Send a successful response with the fetched tours
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    // Handle errors, send an error response
    console.error(err);
    res.status(400).json({ success: false, message: "Failed to fetch" });
  }
};

const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

const updateTour = async (req, res) => {
  let tour = await Tour.findById(req.params.id);
  if (!tour) {
    console.log("tour not found with this ID!");
    res.json({ message: "tour not found with '" + req.params.id + "' ID!" });
  } else {
    const { title, state, address, desc, price, maxGroupSize, featured } =
      req.body;
    const photo = req.file?.filename;
    console.log(req.body);
    
    let updateTour = {};
    if (title) {
      updateTour.title = title;
    }
    if (state) {
      updateTour.state = state;
    }
    if (address) {
      updateTour.address = address;
    }
    if (desc) {
      updateTour.desc = desc;
    }
    if (price) {
      updateTour.price = price;
    }
    if (maxGroupSize) {
      updateTour.maxGroupSize = maxGroupSize;
    }
    if (featured) {
      updateTour.featured = featured;
    }
    if (photo) {
      updateTour.photo = photo;
    }
    tour = await Tour.findByIdAndUpdate(
      req.params.id,
      { $set: updateTour },
      { new: true }
    );
    console.log("tour info updated successfully");
    res.json({ message: "tour info updated successfully", data: tour });
  }
};
const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the tour by ID and delete it
    const deletedTour = await Tour.findByIdAndDelete(id);

    // If tour is not found, return an error response
    if (!deletedTour) {
      return res.status(404).json({ success: false, error: "Tour not found" });
    }

    // Send a success message as a response
    res.json({
      success: true,
      message: "Tour deleted successfully",
      data: deletedTour, // Optionally, you can send back the deleted tour
    });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error deleting tour:", error);
    res
      .status(400)
      .json({ success: false, error: "Invalid data or error deleting tour" });
  }
};

const getTourBySearch = async (req, res) => {
  // Create a case-insensitive regular expression for the city
  const state = new RegExp(req.query.state, "i");
  const title = new RegExp(req.query.title, "i");
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    let query = { state,title };

    // Check if maxGroupSize is a valid number
    if (!isNaN(maxGroupSize)) {
      // If valid, add maxGroupSize condition to the query
      query.maxGroupSize = { $gte: maxGroupSize };
    }

    // Find tours matching the search criteria (city and maxGroupSize)
    const tours = await Tour.find(query).populate("reviews");

    // Send a success response with the matched tours
    res.status(200).json({
      success: true,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    // If an error occurs, send an error response
    res.status(400).json({ success: false, message: "Tours not found" });
  }
};

//featured tour
const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Succesfully",
      data: tours,
    });
  } catch (err) {
    res.status(400).json({ sucess: false, message: "Failed to fetch" });
  }
};
const getFeaturedTours2 = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      

    res.status(200).json({
      success: true,
      message: "Succesfully",
      data: tours,
    });
  } catch (err) {
    res.status(400).json({ sucess: false, message: "Failed to fetch" });
  }
};

// get tour counts
const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};

module.exports = {
  createTour,
  getAllTours,
  getAllToursForAdmin,
  getSingleTour,
  updateTour,
  deleteTour,
  getTourBySearch,
  getFeaturedTours,
  getFeaturedTours2,
  getTourCount,
};
