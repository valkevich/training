import cors from 'cors';

const corsOptions = { 
    origin: 'http://127.0.0.1:5500',
    optionSuccessStatus: 200,
};


export const corsMiddleware = cors(corsOptions);