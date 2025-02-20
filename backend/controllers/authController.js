const User = require('../models/userModel.js');

const multer = require('multer');

const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, username, password });

    console.log(req);
    
    if (req.file) {
      user.profilePhoto = req.file.buffer;
      user.profilePhoto.contentType = req.file.mimetype; 
   
    }

    await user.save();

    const token = user.generateAuthToken();

    res.status(201).json({
      user: { email: user.email, username: user.username, _id: user._id },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    const populatedUser = await User.findById(user._id)
      .populate('pendingRequests','_id email username profilePhoto')  
      .populate('following','_id email username profilePhoto')       
      .populate('followers','_id email username profilePhoto');      


    let profilePhotoBase64 = null;
    if (populatedUser.profilePhoto) {
      profilePhotoBase64 = populatedUser.profilePhoto.toString('base64');
    }

    res.status(200).json({
      user: {
        ...populatedUser.toObject(),
        profilePhoto: profilePhotoBase64, 
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
