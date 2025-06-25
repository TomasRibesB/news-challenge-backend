import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas las noticias con paginación y selección de claves',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de elementos por página',
  })
  @ApiQuery({
    name: 'fields',
    required: false,
    description: 'Claves a seleccionar, separadas por comas',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado obtenido correctamente.',
    type: [News],
  })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('fields') fields?: string,
  ): Promise<Partial<News>[]> {
    return this.newsService.findAll({ page, limit, fields });
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar noticias por término' })
  @ApiQuery({
    name: 'term',
    required: true,
    description: 'Texto para buscar en title o author',
  })
  @ApiResponse({
    status: 200,
    description: 'Noticias encontradas.',
    type: [News],
  })
  search(@Query('term') term: string): Promise<News[]> {
    return this.newsService.search(term);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una noticia por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la noticia' })
  @ApiResponse({
    status: 200,
    description: 'Noticia encontrada.',
    type: News,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<News> {
    return this.newsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva noticia' })
  @ApiResponse({
    status: 201,
    description: 'Noticia creada correctamente.',
    type: News,
  })
  create(@Body() dto: CreateNewsDto): Promise<News> {
    return this.newsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una noticia existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la noticia' })
  @ApiResponse({
    status: 200,
    description: 'Noticia actualizada correctamente.',
    type: News,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNewsDto,
  ): Promise<News> {
    return this.newsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar una noticia por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la noticia' })
  @ApiResponse({
    status: 204,
    description: 'Noticia eliminada correctamente.',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.newsService.remove(id);
  }
}
