import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepo<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const createMockRepo = <T extends ObjectLiteral>(): MockRepo<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  }),
  count: jest.fn(),
});

describe('NewsService', () => {
  let service: NewsService;
  let repo: MockRepo<News>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: getRepositoryToken(News),
          useValue: createMockRepo<News>(),
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    repo = module.get<MockRepo<News>>(getRepositoryToken(News));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll() should return array of news', async () => {
    const fakeNews = [
      {
        id: 1,
        title: 't',
        body: 'b',
        image_url: 'u',
        author: 'a',
        date: new Date(),
      },
    ];
    repo.find!.mockResolvedValue(fakeNews);
    await expect(
      service.findAll({ page: 1, limit: 10, fields: 'id,title' }),
    ).resolves.toEqual(fakeNews);
    expect(repo.find).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      select: ['id', 'title'],
    });
  });

  it('findOne() should return one news', async () => {
    const fake = { id: 1 } as News;
    repo.findOne!.mockResolvedValue(fake);
    await expect(service.findOne(1)).resolves.toEqual(fake);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('findOne() should throw NotFoundException if news not found', async () => {
    repo.findOne!.mockResolvedValue(undefined);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('create() should save a new news', async () => {
    const dto = {
      title: 't',
      body: 'b',
      image_url: 'u',
      author: 'a',
      date: '2025-06-24T00:00:00Z',
    };
    const created = { ...dto, id: 1, date: new Date(dto.date) } as News;
    repo.create!.mockReturnValue(created);
    repo.save!.mockResolvedValue(created);

    await expect(service.create(dto as any)).resolves.toEqual(created);
    expect(repo.create).toHaveBeenCalledWith({
      ...dto,
      date: new Date(dto.date),
    });
    expect(repo.save).toHaveBeenCalledWith(created);
  });

  it('update() should update an existing news', async () => {
    const dto = { title: 'Updated Title' };
    const updatedNews = { id: 1, ...dto } as News;
    repo.update!.mockResolvedValue({ affected: 1 });
    repo.findOne!.mockResolvedValue(updatedNews);

    await expect(service.update(1, dto as any)).resolves.toEqual(updatedNews);
    expect(repo.update).toHaveBeenCalledWith(1, dto);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('remove() should delete a news', async () => {
    repo.delete!.mockResolvedValue({ affected: 1 });

    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith(1);
  });

  it('remove() should throw NotFoundException if no news is deleted', async () => {
    repo.delete!.mockResolvedValue({ affected: 0 });
    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });

  it('search() should return news matching search term', async () => {
    const term = 'Test';
    const fakeNews = [{ id: 1, title: 'Test News' } as News];
    const mockQueryBuilder = {
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(fakeNews),
    };
    repo.createQueryBuilder!.mockReturnValue(mockQueryBuilder);

    await expect(service.search(term)).resolves.toEqual(fakeNews);
    expect(repo.createQueryBuilder).toHaveBeenCalledWith('news');
    expect(mockQueryBuilder.where).toHaveBeenCalledWith(
      'news.title ILIKE :t OR news.author ILIKE :t',
      { t: `%${term}%` },
    );
  });

  it('count() should return the number of news', async () => {
    const count = 5;
    repo.count!.mockResolvedValue(count);

    await expect(service.count()).resolves.toEqual(count);
    expect(repo.count).toHaveBeenCalled();
  });
});
