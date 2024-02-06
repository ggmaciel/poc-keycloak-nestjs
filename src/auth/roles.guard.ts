import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routeRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const user = context.getArgs()[0].user;

    if (!user.realm_access) {
      return false;
    }

    const userRoles = user.realm_access.roles;

    const hasPermission = () =>
      routeRoles.every((role) => userRoles.includes(role));

    return hasPermission();
  }
}
