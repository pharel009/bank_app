import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, config.auth.accessTokenSecretKey, { expiresIn: config.auth.accessTokenExpire,});

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production"
  });
  return token;
};



export const generateVerificationToken = () => {
  return crypto.randomBytes(64).toString("hex");
};
