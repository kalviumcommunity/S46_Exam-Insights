const express = require('express');
const router = express.Router();
const { Post, User } = require('./schema');
const { userJoiSchema, postJoiSchema } = require("./joiSchema");
router.use(express.json());



// Read all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/users', async (req, res) => {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Create a new post
router.post('/posts', async (req, res) => {
    const { error } = postJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const post = new Post({
        element: req.body.element,
        category: req.body.category,
        expectation: req.body.expectation,
        postedBy: req.body.postedBy,
        imageLink: req.body.imageLink,
        quote: req.body.quote
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a user
router.patch('/users/:id', async (req, res) => {
    try {
        const { error } = userJoiSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a post
router.patch('/posts/:id', async (req, res) => {
    try {
        const { error } = postJoiSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.element = req.body.element || post.element;
        post.category = req.body.category || post.category;
        post.expectation = req.body.expectation || post.expectation;
        post.postedBy = req.body.postedBy || post.postedBy;
        post.imageLink = req.body.imageLink || post.imageLink;
        post.quote = req.body.quote || post.quote;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a post
router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;