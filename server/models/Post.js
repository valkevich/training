import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const Post = new Schema({
    image: { type: String, unique: true }
})

export const postModel = model('Post', Post);