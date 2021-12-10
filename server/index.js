import express from 'express';
import mongoose from 'mongoose';
import router from './routers/router.js';
import authRouter from './routers/authRouter.js'
import fileUploader from 'express-fileupload';
import { corsMiddleware } from './cors.js';

const PORT = process.env.PORT ?? 5000;

const app = express();
app.use(corsMiddleware);

app.use(express.json());
app.use('/auth', authRouter)
app.use(fileUploader({}));

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://user:user@cluster0.rkmji.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`);
        })
    } catch(e) {
        console.log(e);
    }
}

start();