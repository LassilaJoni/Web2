const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  user_name: String,
  email: String,
  role: String,
  password: String,
});

// Convert MongoDB's _id to a more standard id string
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  // Convert _id to id for cleaner serialization
  user.id = user._id.toString();

  // Remove MongoDB's _id and __v
  delete user._id;
  delete user.__v;

  // Remove sensitive data
  delete user.password;
  delete user.role;

  return user;
};

const User = mongoose.model('User', userSchema);

// Support both CommonJS and ES6 module exports
module.exports = User;
export default User;
