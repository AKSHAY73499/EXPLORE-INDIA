const mongoose = require("mongoose");

function generateOrderId(length) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    orderId: {
      type: String,
      default: function() {
        return generateOrderId(Math.floor(Math.random() * 3) + 8); 
      },
      unique: true,
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    photo:{
      type: String
    },
    bookAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    message: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

// Middleware to execute before saving the document
bookingSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status === 'accepted') {
      this.message = 'Your tour booking is confirmed.';
    } else if (this.status === 'rejected') {
      this.message = 'Your tour booking is canceled.';
    }
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
