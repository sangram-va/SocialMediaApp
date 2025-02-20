const Article = require('../models/articleSchema');
const User = require('../models/userModel');


const createArticle = async (req, res) => {
  const { title, content } = req.body;

  try {
    const article = new Article({
      title,
      content,
      user: req.user._id,  
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getFollowingArticles = async (req, res) => {
  try {
    let { email } = req.user; 

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let { following } = user; 
    if (!following || following.length === 0) {
      return res.json([]);
    }

    let articles = await Article.find({ user: { $in: following } }).populate('user', 'email name');

    if (articles.length === 0) {
      return res.json([]);
    }

    return res.json(articles);
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ error: 'An error occurred while fetching articles' });
  }
};

const likeArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.likeCount += 1;
    await article.save();

    res.status(200).json({ message: 'Article liked', article });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addComment = async (req, res) => {
  const { articleId } = req.params;
  const { text } = req.body;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const comment = { text, user: req.user._id };
    article.comments.push(comment);
    await article.save();

    res.status(201).json({ message: 'Comment added', article });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createArticle,getFollowingArticles, likeArticle, addComment };
