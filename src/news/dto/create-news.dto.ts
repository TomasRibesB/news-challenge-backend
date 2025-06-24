import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsDateString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'Título de la noticia' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Cuerpo detallado de la noticia' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ example: 'https://miweb.com/imagen.jpg' })
  @IsUrl()
  image_url: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: '2025-06-24T12:00:00Z' })
  @IsDateString()
  date: string;
}
