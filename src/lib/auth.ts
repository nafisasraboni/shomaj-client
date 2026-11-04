import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const developmentSecret = "development-only-secret-change-before-deploying";

export function createAuth() {
  const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/shomaj";
  const databaseName = process.env.MONGODB_DB_NAME ?? "shomaj";
  const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const mongoClient = new MongoClient(mongoUri, {
    connectTimeoutMS: 10_000,
    serverSelectionTimeoutMS: 10_000,
  });

  return betterAuth({
    appName: "Shomaj",
    baseURL,
    secret: process.env.BETTER_AUTH_SECRET ?? developmentSecret,
    database: mongodbAdapter(mongoClient.db(databaseName), { client: mongoClient }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
      maxPasswordLength: 128,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? "google-client-id-not-configured",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "google-client-secret-not-configured",
      },
    },
    user: {
      changeEmail: { enabled: false },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
    trustedOrigins: [baseURL, "http://localhost:3000"],
    advanced: {
      database: { joins: true },
      ipAddress: {
        ipAddressHeaders: ["cf-connecting-ip", "x-real-ip", "x-forwarded-for"],
      },
    },
    plugins: [
      jwt({
        jwt: {
          issuer: baseURL,
          audience: baseURL,
          expirationTime: "15m",
          definePayload: ({ user }) => ({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }),
        },
      }),
      nextCookies(),
    ],
  });
}
