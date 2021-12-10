import { userModel } from '../models/User.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { secret } from '../config.js';

const generateAccessToken = (id) => {
    const payload = {
        id,
    }
    return jwt.sign(payload, secret.secret, { expiresIn: "24h" })
}


class AuthService {
    async registrateUser(userEmail, userPassword, userSex, userBirthDate) {
        const candidate = await userModel.findOne({ userEmail })
        if (candidate) {
            throw new Error('Пользователь с таким email уже существует');
        }
        const hashPassword = bcrypt.hashSync(userPassword, 7);
        const user = new userModel({ userEmail, userPassword: hashPassword, userSex, userBirthDate });
        await user.save();
    }

    async loginUser(userEmail, userPassword) {
        const user = await userModel.findOne({ userEmail });
        if (!user) {
            throw new Error('Пользователь с таким email не найден');
        }
        const validPassword = bcrypt.compareSync(userPassword, user.userPassword)
        if (!validPassword) {
            throw new Error('Введен неверный пароль');
        }
        const token = generateAccessToken(user._id)
        return { user, token }
    }

    async changeUserPassword(updatedUser) {
        const userId = updatedUser._id;
        const oldUserData = await userModel.findOne({ _id: userId })
        if(bcrypt.compareSync(updatedUser.userOldPassword, oldUserData.userPassword)){
            if (bcrypt.compareSync(updatedUser.userPassword, oldUserData.userPassword)) {
                throw new Error('Новый пароль совпадает со старым');
            } else {
                return true;
            }
        } else {
            throw new Error('Вы ввели неверный старый пароль');
        }
    }
}

export default new AuthService();