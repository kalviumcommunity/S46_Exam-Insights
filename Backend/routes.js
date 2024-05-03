const express = require('express');
const router = express.Router();
const { Post, User } = require('./schema');
const { userJoiSchema, postJoiSchema } = require("./joiSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.use(express.json());


const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 1 * 24 * 60 * 60
    });
};

const authenticate = (req, res, next) => { 
    const token = req.headers.authorization;
 
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Unauthorized: No token provided' });
    }
    const authToken = token.split('Bearer ')[1];
    
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).send({ message: 'Forbidden: Invalid token' });
    }
}

// Read all users
router.get('/users',authenticate, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read all posts
router.get('/posts',authenticate, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a user by ID
router.get('/users/:id',authenticate, async (req, res) => {
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
router.get('/posts/:id',authenticate, async (req, res) => {
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
    try {
        const { error } = userJoiSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        } else {
            const usernameExists = await User.findOne({ username: req.body.username });
            if (usernameExists) {
                return res.status(409).json({ message: "Username already exists" });
            }
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(409).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 12);


            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });

            const newUser = await user.save();
            const token = createToken({
                userId: newUser._id,
                username: newUser.username,
            });

            res.status(201).json({ token, userId: newUser._id, username: newUser.username, email: newUser.email });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



//get current user id
router.get('/user', authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: 'User data not found' });
        }

        res.json({ userId: req.user.userId, username: req.user.username, email: req.user.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Create a new post
router.post('/posts',authenticate, async (req, res) => {
    const { error } = postJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const post = new Post({
        title: req.body.title,
        category: req.body.category,
        expectation: req.body.expectation,
        postedBy: req.body.postedBy,
        imageLink: req.body.imageLink,
        quote: req.body.quote,
        likes: req.body.likes
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" })
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect password" })
        }

        const token = createToken({
            userId: user._id,
            username: user.username,
        });

        res.status(200).json({ token, userId: user._id, username: user.username, email: user.email });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
});

// Update a user
router.patch('/users/:id',authenticate, async (req, res) => {
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
router.patch('/posts/:id',authenticate, async (req, res) => {
    try {
        const { error } = postJoiSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.title = req.body.title || post.title;
        post.category = req.body.category || post.category;
        post.expectation = req.body.expectation || post.expectation;
        post.postedBy = req.body.postedBy || post.postedBy;
        post.imageLink = req.body.imageLink || post.imageLink;
        post.quote = req.body.quote || post.quote;
        post.likes = req.body.likes || post.likes

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.patch('/posts/:id/like', authenticate, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.likes = post.likes + 1;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
router.delete('/users/:id',authenticate, async (req, res) => {
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
router.delete('/posts/:id',authenticate, async (req, res) => {
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