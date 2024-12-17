const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "secret";

//user register
const register = async (req, res) => {
  try {
    //hashing password
    const salt = bcrypt.genSaltSync(10); // Corrected typo
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      photo: req.file.filename,
    });
    await newUser.save();
    res.status(200).json({ success: true, message: "User created successfully" }); 
  } catch (err) {
    res.status(500).json({ success: false, message: "Existing Email Id, Login" }); 
  }
};

//user login
const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // if user exists, then check the password or compare the password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const { password, role, ...rest } = user._doc;

    // create jwt token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY, {
      expiresIn: "15d",
    });

    // set token in the browser cookies and send the response to the client
    res
      .cookie("authToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 
      })
      .status(200)
      .json({
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to login. Please try again." });
  }
};
module.exports = {
  register,
  login,
};
