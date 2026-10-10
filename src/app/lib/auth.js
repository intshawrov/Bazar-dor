import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from 'resend';


const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI);
const db = client.db("bazar-dor");
const resend = new Resend(process.env.RESEND_API_KEY);


export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
        },
    },
    // emailVerification: {
    //     sendVerificationEmail: async ({ user, url, token }, request) => {
    //         void resend.emails.send({
    //             from: 'Acme <onboarding@resend.dev>',
    //             to: user.email,
    //             subject: 'Verify Email',
    //             html: `Click the link to verify your email: ${url}`
    //         });
    //     },
    //     sendOnSignUp:true,
    //     autoSignInAfterVerification: true,
    //     expiresIn: 60*5,
    // },
    database: mongodbAdapter(db, {
        client,
    }),
});