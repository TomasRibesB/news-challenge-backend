import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly repo: Repository<News>,
  ) {}

  findAll(): Promise<News[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<News> {
    const news = await this.repo.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException(`News with id ${id} not found`);
    }
    return news;
  }

  create(dto: CreateNewsDto): Promise<News> {
    const news = this.repo.create({
      ...dto,
      date: new Date(dto.date),
    });
    return this.repo.save(news);
  }

  async update(id: number, dto: UpdateNewsDto): Promise<News> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`No se encontró noticia con id ${id}`);
    }
  }

  search(term: string): Promise<News[]> {
    return this.repo
      .createQueryBuilder('news')
      .where('news.title ILIKE :t OR news.author ILIKE :t', { t: `%${term}%` })
      .getMany();
  }

  count(): Promise<number> {
    return this.repo.count();
  }
}
