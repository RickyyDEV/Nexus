import { prismaAdapter } from '@better-auth/prisma-adapter';
import { betterAuth } from 'better-auth/minimal';
import { prisma } from 'src/prisma/prisma';
import { BunEnv } from '@nexus/env';
const auth = betterAuth({
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    discord: {
      enabled: true,
      clientId: BunEnv.DISCORD_CLIENT_ID,
      clientSecret: BunEnv.DISCORD_CLIENT_SECRET,
    },
  },
  appName: 'Nexus',
  baseURL: BunEnv.BETTER_AUTH_URL,
  trustedOrigins: [BunEnv.VITE_APP_URL, BunEnv.PROD_URL],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  experimental: { joins: true },
});

export default auth;
