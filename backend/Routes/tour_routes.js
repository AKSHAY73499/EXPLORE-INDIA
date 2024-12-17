const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getTourBySearch,
  getFeaturedTours,
  getTourCount,
  getAllToursForAdmin,
  getFeaturedTours2,
} = require("../controllers/tour_controller");

const { verifyAdmin }=require('../utils/verifyToken'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/tour/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to add a new tour
router.post("/add",upload.single("photo"),verifyAdmin, createTour);

// Route to fetch all tours
router.get("/get", getAllTours);

router.get("/getforadmin",upload.single("photo"),verifyAdmin,getAllToursForAdmin)

// Route to fetch a single tour by ID
router.get("/singleView/:id", getSingleTour);

// Route to update a tour by ID
router.put("/updatetour/:id",upload.single("photo"), updateTour);

// Route to delete a tour by ID
router.delete("/deletetour/:id",verifyAdmin, deleteTour);

//get tour by search
router.get("/", getTourBySearch);

//get featured Tour by search
router.get("/search/Featured", getFeaturedTours);

//tourCount
router.get("/search/getTourCount", getTourCount);

router.get("/search/Featured2",getFeaturedTours2)

module.exports = router;
