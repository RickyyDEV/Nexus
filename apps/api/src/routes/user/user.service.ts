import { Injectable } from '@nestjs/common';
import { type UserSession } from '@thallesp/nestjs-better-auth';
import type { Server } from 'src/prisma/generated/prisma/client';
import { prisma } from 'src/prisma/prisma';

@Injectable()
export class UserService {
  async getUserServers(session: UserSession): Promise<Server[]> {
    let servers = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        servers: true,
      },
    });
    return servers?.servers ?? [];
  }
}
