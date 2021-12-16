import { postService } from "../services/postService.js";
import { userModel } from "../models/User.js";
import { postModel } from "../models/Post.js";

export class PostController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body;
            const post = new postModel({ name, type, parent, user: req.user.id })
            const parentFile = await postModel.findOne({ _id: parent })
            if (!parentFile) {
                post.path = name;
                await postService.createDir(post)
            } else {
                post.path = `${parentFile.path}\\${post.name}`
                await postService.createDir(post)
                parentFile.childs.push(post._id)
                await parentFile.save()
            }
            await post.save()
            return res.json(post)
        } catch (e) {
            console.log(e);
            return res.status(400).json(e)
        }
    }

    async getUserPosts(req, res) {
        try {
            const posts = await postService.getUserPosts()
            return res.status(200).json(posts)
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: "Can not get files"})
        }
    }

    async create(req, res) {
        try {
            const post = req.body;
            const files = req.files;
            await postService.createPost(post, files)
            res.status(200).json("Post was created")
        } catch (error) {
            console.log(error);
            res.status(400).json({message: error.message});
        }
    }
}

export const postController = new PostController();