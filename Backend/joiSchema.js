const joi = require('joi')

const userJoiSchema = joi.object({
    username: joi.string().min(3).max(20).lowercase().required(),
    email: joi.string().required().email().lowercase(),
    password: joi.string().required(),
})

const postJoiSchema = joi.object({
    element: joi.string().min(3).max(40).required(),
    category: joi.string().min(3).max(15).required(),
    expectation: joi.string().min(3).max(30).required(),
    postedBy: joi.string().required(),
    imageLink: joi.string().required(),
    quote: joi.string().min(3).max(40).required()
})

module.exports = {
    userJoiSchema,
    postJoiSchema
}