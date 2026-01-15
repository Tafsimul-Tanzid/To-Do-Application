import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoRepository, TODO_REPOSITORY } from './interfaces/todo-repository.interface';
import { Todo } from '../entities/todo.entity';
import { TodoStatus } from '../common/enums';

describe('TodosService', () => {
  let service: TodosService;
  let repository: jest.Mocked<TodoRepository>;

  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    status: TodoStatus.PENDING,
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: null as any,
  };

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: TODO_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = module.get(TODO_REPOSITORY);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const createDto = { title: 'Test Todo', description: 'Test Description' };
      repository.create.mockResolvedValue(mockTodo);

      const result = await service.create('user-1', createDto);

      expect(result).toEqual(mockTodo);
      expect(repository.create).toHaveBeenCalledWith({
        ...createDto,
        userId: 'user-1',
      });
    });
  });

  describe('findAll', () => {
    it('should return all todos for a user', async () => {
      repository.findAll.mockResolvedValue([mockTodo]);

      const result = await service.findAll('user-1');

      expect(result).toEqual([mockTodo]);
      expect(repository.findAll).toHaveBeenCalledWith('user-1', undefined);
    });

    it('should filter todos by status', async () => {
      repository.findAll.mockResolvedValue([mockTodo]);

      const result = await service.findAll('user-1', TodoStatus.PENDING);

      expect(result).toEqual([mockTodo]);
      expect(repository.findAll).toHaveBeenCalledWith('user-1', TodoStatus.PENDING);
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', async () => {
      repository.findById.mockResolvedValue(mockTodo);

      const result = await service.findOne('1', 'user-1');

      expect(result).toEqual(mockTodo);
      expect(repository.findById).toHaveBeenCalledWith('1', 'user-1');
    });

    it('should throw NotFoundException if todo not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne('1', 'user-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const updateDto = { title: 'Updated Todo' };
      const updatedTodo = { ...mockTodo, title: 'Updated Todo' };
      repository.findById.mockResolvedValue(mockTodo);
      repository.update.mockResolvedValue(updatedTodo);

      const result = await service.update('1', 'user-1', updateDto);

      expect(result).toEqual(updatedTodo);
      expect(repository.update).toHaveBeenCalledWith('1', 'user-1', updateDto);
    });

    it('should throw NotFoundException if todo not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update('1', 'user-1', { title: 'Updated' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a todo', async () => {
      repository.findById.mockResolvedValue(mockTodo);
      repository.delete.mockResolvedValue(undefined);

      await service.remove('1', 'user-1');

      expect(repository.delete).toHaveBeenCalledWith('1', 'user-1');
    });

    it('should throw NotFoundException if todo not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.remove('1', 'user-1')).rejects.toThrow(NotFoundException);
    });
  });
});
