import Elysia from "elysia";
import { macro } from "../macro";
import { prisma } from "../prisma/prisma";

export const UserRouter = new Elysia({ prefix: "/user" }).use(macro).get(
  "/servers",
  async ({ user }) => {
    return await prisma.server.findMany({
      where: {
        ownerUserId: user.id,
      },
    });
  },
  {
    auth: true,
  },
);
