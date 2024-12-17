const express = require("express");
const multer = require("multer");
const router = express.Router();
const { updateUser, deleteUser, getSingleUser, getAllUsers, createUser, getUserCount } = require("../controllers/user_controller");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/users/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

// Route to fetch all Users
router.get("/getUser",verifyAdmin, getAllUsers);

// Route to fetch a single User by ID
router.get("/:id",verifyAdmin ,getSingleUser);

// Route to update a User by ID
router.put("/:id",upload.single("photo"), updateUser);

// Route to delete a User by ID
router.delete("/:id", verifyAdmin,deleteUser);

router.get("/getusercount/count",verifyAdmin,getUserCount)

module.exports = router;
