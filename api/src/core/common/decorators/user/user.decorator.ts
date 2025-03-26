import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const {user} = request;
    console.log('PRUEBA DE DECORADOR DE USUARIO',user)
    return data ? user && user[data] : user;
  },
);
