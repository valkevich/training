import mongoose from 'mongoose';
const { Schema, model, ObjectId } = mongoose;


const Post = new Schema({
    accessLink: { type: String },
    size: { type: Number, default: 0 },
    user: { type: ObjectId, ref: 'User' },
    image: { type: Array },
    decodedImage: { type: String },
    title: { type: String },
    description: { type: String },
})

export const postModel = model('Post', Post);