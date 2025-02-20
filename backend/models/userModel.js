const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,  
    trim: true,    
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  password: {
    type: String,
    required: true,  
    minlength: 6,
  },
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User',

  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  pendingRequests: [{  
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  profilePhoto: {  
    type: Buffer, 
    contentType: String,  
  },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, email: this.email, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }  // Token will expire in 1 hour
  );
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
