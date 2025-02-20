const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true, 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  }
});

const articleSchema = new Schema({
  title: {
    type: String,
    required: true, 
    trim: true,   
  },
  content: {
    type: String,
    required: true, 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema], 
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
