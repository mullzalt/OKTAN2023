const allowedOrigins = require('./allowedOrigins');

const corsOptions: Object = {
    origin: (origin: String | Boolean, callback: any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

export default corsOptions;