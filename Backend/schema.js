const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    expectation:{
        type: String,
    },
    postedBy: {
        type: String,
    },
    imageLink: {
        type: String,
    },
    quote: {
        type: String,
    },
    likes: {
        type: Number,
    },
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
})


const Post = mongoose.model('posts', postSchema);
const User = mongoose.model('users', userSchema);


module.exports = {Post, User}
