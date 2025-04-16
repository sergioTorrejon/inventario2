import {
  IsOptional
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class UsuariosSearchDto {

  @ApiProperty()
  @IsOptional()
  user?: string;

  @ApiProperty()
  @IsOptional()
  password?: string;

}

export class UsuariosCreateDto {
  
  @ApiProperty()
  @IsOptional()
  user?: string;

  @ApiProperty()
  @IsOptional()
  password?: string;

}

export class UsuariosUpdateDto extends PartialType(
  OmitType(UsuariosCreateDto, ["user"] as const),
) {}


