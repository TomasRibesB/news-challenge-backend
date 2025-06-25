import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { News } from '../src/news/entities/news.entity';

describe('News API (e2e)', () => {
  let app: INestApplication;
  let newsRepo: Repository<News>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    newsRepo = module.get<Repository<News>>(getRepositoryToken(News));
    await newsRepo.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/news (GET) should return empty array initially', () =>
    request(app.getHttpServer()).get('/news').expect(200).expect([]));

  let createdId: number;

  it('/news (POST) should create a news', () =>
    request(app.getHttpServer())
      .post('/news')
      .send({
        title: 'Test Title',
        body: 'Test body',
        image_url: 'https://example.com/img.jpg',
        author: 'Tester',
        date: '2025-06-24T00:00:00Z',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body).toHaveProperty('id');
        createdId = body.id;
      }));

  it('/news (GET) should now return an array with 1 item', () =>
    request(app.getHttpServer())
      .get('/news')
      .expect(200)
      .expect((res) => expect(res.body.length).toBe(1)));

  it('/news/:id (GET) should return the created news', () =>
    request(app.getHttpServer())
      .get(`/news/${createdId}`)
      .expect(200)
      .expect((res) => expect(res.body.id).toBe(createdId)));

  it('/news/search?term=Test (GET) should find the news', () =>
    request(app.getHttpServer())
      .get('/news/search')
      .query({ term: 'Test' })
      .expect(200)
      .expect((res) => expect(res.body[0].id).toBe(createdId)));

  it('/news/:id (PUT) should update the news', () =>
    request(app.getHttpServer())
      .put(`/news/${createdId}`)
      .send({ title: 'Updated Title' })
      .expect(200)
      .expect((res) => expect(res.body.title).toBe('Updated Title')));

  it('/news/:id (DELETE) should delete the news', () =>
    request(app.getHttpServer()).delete(`/news/${createdId}`).expect(204));

  it('/news (GET) should return empty array again', () =>
    request(app.getHttpServer()).get('/news').expect(200).expect([]));
});
