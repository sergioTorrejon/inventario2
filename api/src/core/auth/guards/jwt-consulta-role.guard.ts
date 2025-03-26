import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class JwtConsultaRoleGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    console.log('inside JwtConsultaRoleGuard');
    console.log(user);
    //if (user && user.role && (user.role.includes(Roles.ConsultaFuncionarios) || user.role.includes(Roles.Administrador) || user.role.includes(Roles.OperadorFuncionarios) || user.role.includes(Roles.AprobadorFuncionarios))) {
      if (user && user.role && (user.role.includes(Roles.consulta)) || (user.role.includes(Roles.Administrador))) {
      return user;
    }
    throw new ForbiddenException();
  }
} 
