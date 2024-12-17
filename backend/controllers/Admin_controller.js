const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../Models/Admin');
const JWT_SECRET_KEY =  "secret"; 

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin with provided email exists
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare provided password with the one stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET_KEY, { expiresIn: '1h' });

    // Return login success response with token and user details
    res.status(200).json({
      message: "Login successful!",
      success: true,
      loggedInUser: user,
      token: token,
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const register = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if admin with the provided email already exists
      let existingAdmin = await Admin.findOne({ email });
  
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new admin
      const newAdmin = new Admin({
        email,
        password: hashedPassword
      });
  
      // Save the admin to the database
      await newAdmin.save();
  
      // Generate a JWT token for authentication
      const token = jwt.sign({ email: newAdmin.email, role: newAdmin.role }, JWT_SECRET_KEY, { expiresIn: '1h' });
  
      // Return token as response
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error during admin registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = {
  login,
  register
};
