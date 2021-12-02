import express from 'express';
import router from './router.js';
import fileUploader from 'express-fileupload';
import { corsMiddleware } from './cors.js'

const PORT = process.env.PORT ?? 5000;

const app = express();
app.use(corsMiddleware);

app.use(express.json());
app.use(fileUploader({}));
app.use('/', router);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));