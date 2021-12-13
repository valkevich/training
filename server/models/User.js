import mongoose from 'mongoose';
const { Schema, model }  = mongoose;


const User = new Schema({
    userEmail: {type: String, unique: true, required: true},
    userPassword: {type: String, required: true},
    userSex: {type: String},
    userBirthDate: {type: String},
    posts: {type: Array}
})

export const userModel = model('User', User);