"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const todo_repository_interface_1 = require("./interfaces/todo-repository.interface");
let TodosService = class TodosService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async create(userId, createTodoDto) {
        return this.todoRepository.create({
            ...createTodoDto,
            userId,
        });
    }
    async findAll(userId, status) {
        return this.todoRepository.findAll(userId, status);
    }
    async findOne(id, userId) {
        const todo = await this.todoRepository.findById(id, userId);
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }
    async update(id, userId, updateTodoDto) {
        const existingTodo = await this.todoRepository.findById(id, userId);
        if (!existingTodo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        return this.todoRepository.update(id, userId, updateTodoDto);
    }
    async remove(id, userId) {
        const todo = await this.todoRepository.findById(id, userId);
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        await this.todoRepository.delete(id, userId);
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(todo_repository_interface_1.TODO_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], TodosService);
//# sourceMappingURL=todos.service.js.map