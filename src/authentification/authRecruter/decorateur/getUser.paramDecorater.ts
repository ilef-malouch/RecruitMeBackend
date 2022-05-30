import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRecruter } from '../models/auth-recruter.model';  
export const GetRecruter = createParamDecorator(
  (data, ctx: ExecutionContext): AuthRecruter => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
