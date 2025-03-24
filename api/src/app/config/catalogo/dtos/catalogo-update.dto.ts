import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { CatalogoCreateDto } from './';

export class CatalogoUpdateDto extends PartialType(
  OmitType(CatalogoCreateDto, ['categoria',"codigo"] as const),
) {}
