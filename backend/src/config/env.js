import dotenv from 'dotenv';

dotenv.config();


export const config = {
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT
    },

    auth:{
        accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET,
        accessTokenExpire: process.env.AccessTokenExpire
    },

    mailer: {
        email: process.env.maileruser,
        password: process.env.mailerpass
    },

    apilayer: {
        apikey: process.env.APIKEY
    }
};