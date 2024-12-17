const express = require("express");
const ConnectToMongo = require("./db");
const cors = require("cors");
const cookieParser = require('cookie-parser');

ConnectToMongo();
const app = express();
app.use(express.json());
const corsOptions={
  origin:true,
  credentials:true,
}
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/tours", require("./Routes/tour_routes"));
app.use("/api/user", require("./Routes/user_routes"));
app.use("/api/review", require("./Routes/reviews_routes"));
app.use("/api/booking", require("./Routes/booking_routes"));
app.use("/api/admin", require("./Routes/admin_routes"));
app.use("/uploads/tour", express.static("./uploads/tour"));
app.use("/uploads/tour", express.static("./uploads/tour"));
app.use("/uploads/users", express.static("./uploads/users"));

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
