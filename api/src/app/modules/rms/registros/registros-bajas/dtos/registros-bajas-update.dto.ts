import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { RegistrosBajasCreateDto } from './';

export class RegistrosBajasUpdateDto extends PartialType(
  OmitType(RegistrosBajasCreateDto, ['funcionario'] as const),
) {}
