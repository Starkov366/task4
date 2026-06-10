import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 5000,
    socketTimeout: 5000,
});

export async function sendVerificationEmail(email: string, token: string) {
    const link = `${process.env.BASE_URL}/api/auth/verify/${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Verify your account",
        html: `
            <h3>Verify account!</h3>
            <a href="${link}">verify</a>
        `
    });
}