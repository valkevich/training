import mongoose from 'mongoose';
const { Schema, model, ObjectId }  = mongoose;


const User = new Schema({
    userEmail: {type: String, unique: true, required: true},
    userPassword: {type: String, required: true},
    userSex: {type: String},
    userBirthDate: {type: String},
    posts: {type: [ObjectId]}
})

export const userModel = model('User', User);