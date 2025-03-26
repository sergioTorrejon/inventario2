import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class JwtAdminRoleGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    console.log('inside JwtAdminRoleGuard');
    console.log(user);
    if (user && user.role && (user.role.includes(Roles.Administrador) || user.role.includes(Roles.Operador) || user.role.includes(Roles.Supervisor))) {
      return user;
    }
    throw new ForbiddenException();
  }
} 
