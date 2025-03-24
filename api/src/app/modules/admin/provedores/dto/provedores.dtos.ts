import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class ProvedoresCreateDto {
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codigo?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(250)
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(250)
  paisOrigen?: string;

}

export class ProvedoresUpdateDto extends PartialType(
  OmitType(ProvedoresCreateDto, ["nombre"] as const),
) {}

export class ProvedoresSearchDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  codigo?: string;

  @ApiProperty()
  @IsOptional()
  nombre?: string;
  
}
