
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
// import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { admin } from "better-auth/plugins"


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    github: {
      // clientId: env.AUTH_GITHUB_CLIENT_ID,
      // clientSecret: env.AUTH_GITHUB_SECRET,
      clientId: process.env.AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "MarshalLMS <onboarding@resend.dev>",
          to: [email],
          subject: "MarshalLMS - Verify your email",
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
      },
    }),
    admin(),
  ],
});
