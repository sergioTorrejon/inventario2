import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(100)
    username: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(100)
    role: string[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    company: string;

}
