import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '../news/entities/news.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
