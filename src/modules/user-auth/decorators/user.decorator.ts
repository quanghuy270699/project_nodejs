import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from "src/modules/user-account/dto/user.dto";
import { IJwtPayload } from "../jwt-payload.interface";
import { User } from 'src/modules/user-account/user.entity';

export const GetUser = createParamDecorator(
  (data, req): User => {
      const user = req.args[0].user;
      return user;
  },
);

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp().getRequest();
    return ctx.req.user;
  }
)