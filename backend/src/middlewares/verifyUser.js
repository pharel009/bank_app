import { config } from "../config/env.js";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "./error.js";
import { userService } from "../user/user.service.js";
import { sanitize } from "../utils/sanitizeUser.js";


//verify token token from the cookies
export const verifyUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next(new ErrorResponse('Authorization token required', 401))
    }
    try {
        const decoded = jwt.verify(token, config.auth.accessTokenSecretKey);

        if (!decoded) {
            return next(new ErrorResponse('Invalid user', 401))
        }

        const decodedUser = await userService.getUserById(decoded.userId);

        if (!decodedUser) {
            return next(new ErrorResponse('User not found', 404));
        }

        const user = sanitize(decodedUser);

        req.user = user;

        next();
    } catch (error) {
        return next(new ErrorResponse('Request is not authorized', 400))
    }
};




// //middleware to verify user token in the request headers
// export const requireAuth = async (req, res, next) => {
//     const { authorization } = req.headers;

//     if (!authorization) return res.status(401).json({
//         error: "Authorization token required!"
//     })

//     const token = authorization.split(' ')[1]

//     if (!token) return res.status(401).json({
//         error: "No token"
//     })

//     try {       
//         const decoded = jwt.verify(token, config.auth.accessTokenSecretKey);

//         if (!decoded || !decoded.user) return res.status(401).json({error: 'Invalid user'});

//         req.user = decoded.user
    
//         next();
            
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({error: 'Request is not authorized'})
//     }
// };

