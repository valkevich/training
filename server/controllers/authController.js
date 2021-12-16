import { userModel } from '../models/User.js';
import bcrypt from "bcryptjs";
import { json } from 'express';
import authService from '../services/authService.js';
import { postService } from '../services/postService.js';
import { postModel } from '../models/Post.js';

class authController {
    async registration(req, res) {
        try {
            const { userEmail, userPassword, userSex, userBirthDate } = req.body;
            await authService.registrateUser(userEmail, userPassword, userSex, userBirthDate)
            res.status(200).json({ message: "Пользователь зарегистрирован" })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: e.message });
        }
    }

    async login(req, res) {
        try {
            const { userEmail, userPassword } = req.body;
            const userData = await authService.loginUser(userEmail, userPassword)
            res.status(200).json({ userData })
            return true;
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: e.message });
            return false;
        }
    }

    async getUsers(req, res) {
        try {
            const users = await userModel.find()
            res.status(200).json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Нет зарегистрированных пользователей" });
        }
    }

    async getUser(req, res) {
        try {
            const { _id } = req.body;
            const user = await userModel.find({ _id: _id })
            res.status(200).json(user)
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Пользователь не найден" });
        }
    }

    async deleteUser(req, res) {
        try {
            const { _id } = req.body;
            await userModel.deleteOne({ _id: _id });
            res.status(200).json({ message: "User successfully deleted" })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Не удалось удалить пользователя" });
        }
    }

    async updateUserPassword(req, res) {
        try {
            const updatedUser = req.body;
            const _id = updatedUser._id;
            if (await authService.changeUserPassword(updatedUser)) {
                updatedUser.userPassword = bcrypt.hashSync(updatedUser.userPassword, 7);
                await userModel.replaceOne({ _id }, updatedUser);
                res.status(200).json({ message: 'Successfully updated' });
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: e.message });
        }
    }


    async updateUserEmail(req, res) {
        try {
            const updatedUser = req.body;
            const _id = updatedUser._id;
            await userModel.replaceOne({ _id }, updatedUser);
            res.status(200).json({ message: 'Successfully updated' })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "пользователь с таким Email уже существует" });
        }
    }

    async makePost(req, res) {
        try {
            const image = req.body;
            res.status(200).json(image);
            
        } catch (e) {
            console.log(e);
        }
    }
}

export const controller = new authController();