const mongoose = require("mongoose");
const bcrypt   = require('bcrypt');
const jwt = require('jwt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name!"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"]  
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
        minLength: [4, "Password should be greater than 4 characters"],
        select: false,
    },
    address: [
        {
            city:{
                type: String,
            },
            zipCode:{
                type: Number,
            },

        }
    ],
    role:{
        type: String,
        default: "user",
    },
    avatar: {
        type: String,
    },
    resetPasswordToken: String,
    resetPasswordTime: Date, 
});

// Hash Password
// userSchema.pre("save", async function (next:any) {
//     // if (this.isModified("password")) {
//     //     next();
//     // }
//     this.password = await bcrypt.hash(this.password, 10)
// })

// jwt token generation
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES
  });
  return token;
}

// compare Password
userSchema.methods.comparePassword = async function (enteredPassword:String) {
    return await bcrypt.compare(enteredPassword, this.password)  
}

// validate User
// function validateUser(user: any) {
//     const schema = {
//         name: jo
//     }
// }

module.exports = mongoose.model('User', userSchema)