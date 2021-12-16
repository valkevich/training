import * as fs from 'fs';
import * as path from 'path';
import { postModel } from '../models/Post.js';
import { userModel } from '../models/User.js';
import config from '../config/config.js';
import fileService from './fileService.js';
import base64Img from 'base64-img';


class PostService {
    createDir(file) {
        const filePath = `${config.assetsPath}\\${file.user}\\${file.path}`
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({ message: "File was created" })
                } else {
                    return reject({ message: 'File already exist' })
                }
            } catch (e) {
                return reject({ message: 'File error' })
            }
        }));
    };

    async createPost(post, files) {
        const fileNames = [];
        for (let file in files) {
            const fileName = fileService.writeFile(post.user, files[file]);
            fileNames.push(fileName);
        }
        const user = await userModel.findById({ _id: post.user });
        const filePath = `${config.assetsPath}\\${user._id}\\${fileNames[0]}`
        const newPost = new postModel({
            ...post,
            image: [...fileNames],
            decodedImage: base64Img.base64Sync(filePath)
        })
        await newPost.save();
        user.posts = await this.getUserPosts(post.user);
        user.save();
    }

    async getUserPosts() {
        const posts = await postModel.find();
        return posts;
    }
};

export const postService = new PostService();
