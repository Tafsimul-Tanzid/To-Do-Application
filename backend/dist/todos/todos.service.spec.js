"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const todos_service_1 = require("./todos.service");
const todo_repository_interface_1 = require("./interfaces/todo-repository.interface");
const enums_1 = require("../common/enums");
describe('TodosService', () => {
    let service;
    let repository;
    const mockTodo = {
        id: '1',
        title: 'Test Todo',
        description: 'Test Description',
        status: enums_1.TodoStatus.PENDING,
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: null,
    };
    const mockRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                todos_service_1.TodosService,
                {
                    provide: todo_repository_interface_1.TODO_REPOSITORY,
                    useValue: mockRepository,
                },
            ],
        }).compile();
        service = module.get(todos_service_1.TodosService);
        repository = module.get(todo_repository_interface_1.TODO_REPOSITORY);
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
            const result = await service.findAll('user-1', enums_1.TodoStatus.PENDING);
            expect(result).toEqual([mockTodo]);
            expect(repository.findAll).toHaveBeenCalledWith('user-1', enums_1.TodoStatus.PENDING);
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
            await expect(service.findOne('1', 'user-1')).rejects.toThrow(common_1.NotFoundException);
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
            await expect(service.update('1', 'user-1', { title: 'Updated' })).rejects.toThrow(common_1.NotFoundException);
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
            await expect(service.remove('1', 'user-1')).rejects.toThrow(common_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=todos.service.spec.js.map