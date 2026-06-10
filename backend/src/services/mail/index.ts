import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
    const link = `${process.env.BASE_URL}/api/auth/verify/${token}`;

    console.log("EMAIL START:", email);

    try {
        const result = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verify your account",
            html: `
                <h3>Verify account!</h3>
                <a href="${link}">verify</a>
            `,
        });

        console.log("EMAIL SENT:", result);
        return result;

    } catch (err) {
        console.error("EMAIL ERROR:", err);
    }
}