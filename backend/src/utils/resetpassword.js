import { transporter } from "../config/nodemailer.js";
import { config } from "../config/env.js";

export const sendForgotPasswordMail = async (user) => {
    if (!user || !user.email) {
        console.error("User object or email is missing:", user);
        throw new Error("User email is not defined.");
    }

    const resetUrl = `http://localhost:4000/users/reset-password?token=${user.reset_password}`;
    
    const mailOptions = {
        from: {
            name: 'Pharel Web',
            address: config.mailer.email
        },
        to: user.email,
        subject: 'Password Reset Request',
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password</p>`
        
    }
    try {
        await transporter.sendMail(mailOptions)
        console.log('Password Reset link sent to', user.email);
    } catch (error) {
        console.log("Error sending reset link",error);
    }
    
};

