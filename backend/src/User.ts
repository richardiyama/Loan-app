import mongoose from 'mongoose';

const user = new mongoose.Schema({
  fullName: String,
  phone: {
    type: String,
    unique: true
  },
  password: String,
  email: String,
  bvn: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("User", user);