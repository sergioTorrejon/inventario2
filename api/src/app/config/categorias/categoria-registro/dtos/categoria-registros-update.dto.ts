import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { CategoriaRegistroCreateDto } from './';

export class CategoriaRegistroUpdateDto extends PartialType(
  OmitType(CategoriaRegistroCreateDto, ['nivel','categoria',"codigo"] as const),
) {}
