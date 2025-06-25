import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

describe('NewsController', () => {
  let controller: NewsController;
  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    search: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [{ provide: NewsService, useValue: mockService }],
    }).compile();

    controller = module.get<NewsController>(NewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /news calls service.findAll', async () => {
    const result = [{ id: 1 }];
    mockService.findAll.mockResolvedValue(result);
    await expect(controller.findAll()).resolves.toEqual(result);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('GET /news/:id calls service.findOne', async () => {
    const fake = { id: 42 };
    mockService.findOne.mockResolvedValue(fake);
    await expect(controller.findOne(42 as any)).resolves.toEqual(fake);
    expect(mockService.findOne).toHaveBeenCalledWith(42);
  });

  it('POST /news calls service.create', async () => {
    const dto = { title: 'Test News', author: 'Author', date: '2023-10-01' };
    const result = { id: 1, ...dto };
    mockService.create.mockResolvedValue(result);
    await expect(controller.create(dto as any)).resolves.toEqual(result);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('PUT /news/:id calls service.update', async () => {
    const dto = { title: 'Updated News' };
    const result = { id: 1, ...dto };
    mockService.update.mockResolvedValue(result);
    await expect(controller.update(1 as any, dto as any)).resolves.toEqual(
      result,
    );
    expect(mockService.update).toHaveBeenCalledWith(1, dto);
  });

  it('DELETE /news/:id calls service.remove', async () => {
    mockService.remove.mockResolvedValue(undefined);
    await expect(controller.remove(1 as any)).resolves.toBeUndefined();
    expect(mockService.remove).toHaveBeenCalledWith(1);
  });

  it('GET /news/search calls service.search', async () => {
    const term = 'Test';
    const result = [{ id: 1, title: 'Test News' }];
    mockService.search.mockResolvedValue(result);
    await expect(controller.search(term)).resolves.toEqual(result);
    expect(mockService.search).toHaveBeenCalledWith(term);
  });
});
