const z = require('zod')


// creating an object schema

const signUpSchema = z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"name must contain atleast 3 charactera"}),

    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"invalid email"}),

    phone:z
    .string({required_error:"phone number is required"})
    .min(10,{message:"invalid phone number"})
    .max(10,{message:"invalid phone number"}),

    password:z
    .string({required_error:"password is required"})
    .min(6,{message:"password may contain atleast 6 characters"})
})

module.exports = signUpSchema;