import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import {InhabilitacionesCreateDto } from './inhabilitaciones-create.dto';

export class InhabilitacionesUpdateDto extends PartialType(
  OmitType( InhabilitacionesCreateDto, ['personaNatural'] as const),
) {}
