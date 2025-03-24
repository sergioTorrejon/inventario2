import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import {SuspencionesCreateDto } from './suspenciones-create.dto';

export class SuspencionesUpdateDto extends PartialType(
  OmitType( SuspencionesCreateDto, ['personaNatural'] as const),
) {}
