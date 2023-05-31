const mongoose = require("mongoose");
const bcrypt   = require('bcrypt');
const jwt = require('jwt');
import { IUser } from "../interfaces/models/user";

// interface IUserModel extends IUser {
    
// };

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name!"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"]  
    },
    authentication:{
        password: {
            type: String,
            required: [true, "Please enter your password!"],
            minLength: [4, "Password should be greater than 4 characters"],
            select: false,
        },
        salt: {type: String, select:false},
        sessionToken: {type: String, select:false},
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

export const UserModel = mongoose.model('User', userSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email:string) => UserModel.find({email})
export const deleteUserById = (id:string) => UserModel.findOneAndDelete({_id:id});
export const createUser = (values:Record<string, any>) => new UserModel(values).save()













