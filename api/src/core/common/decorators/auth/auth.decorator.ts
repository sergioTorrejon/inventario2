import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';

import {
  applyDecorators,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth() {
  console.log('prueba',JwtAuthGuard)
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
  );
}
