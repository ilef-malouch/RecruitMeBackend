import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthClient } from '../models/auth-client.model';  
export const GetClient = createParamDecorator(
  (data, ctx: ExecutionContext): AuthClient => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
