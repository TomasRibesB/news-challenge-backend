import { IsString, IsNotEmpty, IsUrl, IsDateString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsUrl()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsDateString()
  date: string;
}
