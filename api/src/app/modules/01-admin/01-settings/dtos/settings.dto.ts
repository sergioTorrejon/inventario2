import {
  IsString,
  MaxLength
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateDto {
  
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  codigo: string;
  
  @ApiProperty()
  @IsString()
  @MaxLength(250)
  descripcion: string;

  @ApiProperty()
  @IsString()
  @MaxLength(250)
  valor: string;

}

export class UpdateDto extends PartialType(
  OmitType(CreateDto, ['codigo'] as const),
) {}
