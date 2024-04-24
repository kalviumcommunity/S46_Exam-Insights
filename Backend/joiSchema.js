const joi = require('joi')

const userJoiSchema = joi.object({
    username: joi.string().min(3).max(20).lowercase().required(),
    email: joi.string().required().email().lowercase(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password"),
})

const postJoiSchema = joi.object({
    title: joi.string().min(3).max(40).required(),
    category: joi.string().min(3).max(18).required(),
    expectation: joi.string().min(3).max(30).required(),
    postedBy: joi.string().required(),
    imageLink: joi.string().min(3).required(),
    quote: joi.string().min(3).max(40).required(),
    likes: joi.number()
})

module.exports = {
    userJoiSchema,
    postJoiSchema
}