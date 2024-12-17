const express = require("express");
const multer = require("multer");
const { register, login } = require("../controllers/auth_controller");

const router = express.Router();

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

router.post("/register",upload.single("photo"), register);
router.post("/login", login);

module.exports = router;
