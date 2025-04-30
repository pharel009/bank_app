import dotenv from 'dotenv';

dotenv.config();


export const config = {
    port: process.env.PORT,
    db: {
        database_url: process.env.DATABASE_URL
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