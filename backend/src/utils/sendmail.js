import { transporter } from "../config/nodemailer.js";
import { config } from "../config/env.js";


export const sendMail = async (user) => {

    if (!user || !user.email) {
        console.error("User object or email is missing:", user);
        throw new Error("User email is not defined.");
    }
    const verificationLink = `http://localhost:4000/users/verify?token=${user.verificationtoken}`;

    const mailOptions = {
        from: {
            name: 'Pharel Web',
            address: config.mailer.email
        },
        to: user.email,
        subject: "Account Verification",
        html: `
             <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Account Verification</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: auto;
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                        color: #555;
                    }
                    a {
                        display: inline-block;
                        margin: 20px 0;
                        padding: 10px 20px;
                        background-color: #007BFF;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        transition: background-color 0.3s;
                    }
                    a:hover {
                        background-color: #0056b3;
                    }
                    footer {
                        text-align: center;
                        font-size: 14px;
                        color: #aaa;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hi ${user.firstname} !!!</h1>
                    <p>Thank you for signing up. To complete your registration, please verify your email address by clicking the link below:</p>
                    <a href="${verificationLink}">Verify Your Email</a>
                    <p>If you did not create an account, you can safely ignore this email.</p>
                    <footer>
                        &copy; ${new Date().getFullYear()} All Rights Reserved.
                    </footer>
                </div>
            </body>
            </html>    
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.log(error);
    }
}