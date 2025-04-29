import * as nodemailer from "nodemailer";
import { config } from "./env.js";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.mailer.email,
        pass: config.mailer.password,
    }
});