import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  AuthGuard,
  OptionalAuth,
  RequireActiveOrg,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import { UserService } from './user.service';
import type { Server } from 'src/prisma/generated/prisma/client';
@Controller('/user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get('servers')
  @OptionalAuth()
  async getUserServers(@Session() session: UserSession): Promise<Server[]> {
    if (!session)
      throw new NotFoundException(`User not found, or you are not logged in.`);
    return this.userService.getUserServers(session);
  }
}
