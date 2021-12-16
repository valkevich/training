import jwt from 'jsonwebtoken'
import secret from '../config/config.js';

export const authMiddleware = function(req, res, next) {
    if(req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(483).json({message: "Пользователь не авторизован. Токен не пришел"})
        }
        const decodedData = jwt.verify(token, secret.secret);
        req.user = decodedData;
        next()
    } catch(e) {
        console.log(e);
        return res.status(483).json({message: "Пользователь не авторизован!"});
    }
}