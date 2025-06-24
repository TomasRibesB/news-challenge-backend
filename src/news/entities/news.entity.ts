import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class News {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Avance histórico en energías renovables' })
  @Column()
  title: string;

  @ApiProperty({
    example:
      'Un consorcio internacional ha logrado generar electricidad a partir de paneles solares flotantes...',
  })
  @Column('text')
  body: string;

  @ApiProperty({ example: 'https://example.com/images/renewables.jpg' })
  @Column()
  image_url: string;

  @ApiProperty({ example: 'Laura Martínez' })
  @Column()
  author: string;

  @ApiProperty({ example: '2025-06-24T08:00:00Z' })
  @Column({ type: 'timestamp' })
  date: Date;
}
