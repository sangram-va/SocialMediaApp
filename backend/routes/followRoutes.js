

const express = require('express');
const User = require('../models/userModel.js');
const authMiddleware = require('../middleware/auth.js');  
const router = express.Router();

router.post('/send-request', authMiddleware, async (req, res) => {
  const { targetUsername } = req.body;

  try {
    const gotUser = req.user; 
    console.log(gotUser);

    const currentUser = await User.findOne({ username: gotUser.username });
    console.log(currentUser);

    const targetUser = await User.findOne({ username: targetUsername });
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }

    if (currentUser._id.toString() === targetUser._id.toString()) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    if (currentUser.following.includes(targetUser._id)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    if (!targetUser.pendingRequests.includes(currentUser._id)) {
      targetUser.pendingRequests.push(currentUser._id);
      await targetUser.save();
      await targetUser.populate('followers following pendingRequests', 'username _id');
      return res.status(200).json({ message: 'Follow request sent', user: targetUser });
    } else {
      return res.status(400).json({ message: 'Follow request already sent' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/accept-request', authMiddleware, async (req, res) => {
  const { followerId } = req.body;

  try {
    const currentUser = req.user; 

    const targetUser = await User.findById(currentUser._id);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const followerUser = await User.findById(followerId);
    if (!followerUser) {
      return res.status(404).json({ message: 'Follower not found' });
    }

    if (!targetUser.pendingRequests.includes(followerId)) {
      return res.status(400).json({ message: 'No pending follow request from this user' });
    }

    targetUser.pendingRequests = targetUser.pendingRequests.filter(
      (id) => id.toString() !== followerId.toString()
    );

    targetUser.followers.push(followerId);
    followerUser.following.push(currentUser._id);

    await targetUser.save();
    await followerUser.save();

    await targetUser.populate('followers following pendingRequests', 'username _id');
    await followerUser.populate('followers following pendingRequests', 'username _id');

    res.status(200).json({ message: 'Follow request accepted', user: targetUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/reject-request', authMiddleware, async (req, res) => {
  const { followerId } = req.body;

  try {
    const currentUser = req.user; 

    const targetUser = await User.findById(currentUser._id);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const followerUser = await User.findById(followerId);
    if (!followerUser) {
      return res.status(404).json({ message: 'Follower not found' });
    }

    if (!targetUser.pendingRequests.includes(followerId)) {
      return res.status(400).json({ message: 'No pending follow request from this user' });
    }

    targetUser.pendingRequests = targetUser.pendingRequests.filter(
      (id) => id.toString() !== followerId.toString()
    );

    await targetUser.save();

    await targetUser.populate('followers following pendingRequests', 'username _id');
    await followerUser.populate('followers following pendingRequests', 'username _id');

    res.status(200).json({ message: 'Follow request rejected', user: targetUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
