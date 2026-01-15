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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmTodoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const enums_1 = require("../../common/enums");
let TypeOrmTodoRepository = class TypeOrmTodoRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(todo) {
        const newTodo = this.repository.create({
            title: todo.title,
            description: todo.description,
            status: todo.status || enums_1.TodoStatus.PENDING,
            userId: todo.userId,
        });
        return this.repository.save(newTodo);
    }
    async findAll(userId, status) {
        const queryBuilder = this.repository
            .createQueryBuilder('todo')
            .where('todo.userId = :userId', { userId })
            .orderBy('todo.createdAt', 'DESC');
        if (status) {
            queryBuilder.andWhere('todo.status = :status', { status });
        }
        return queryBuilder.getMany();
    }
    async findById(id, userId) {
        return this.repository.findOne({
            where: { id, userId },
        });
    }
    async update(id, userId, data) {
        const exists = await this.repository.findOne({
            where: { id, userId },
        });
        if (!exists) {
            throw new Error('Todo not found or access denied');
        }
        await this.repository.update(id, {
            ...(data.title && { title: data.title }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.status && { status: data.status }),
        });
        return this.repository.findOne({ where: { id } });
    }
    async delete(id, userId) {
        const todo = await this.repository.findOne({
            where: { id, userId },
        });
        if (!todo) {
            throw new Error('Todo not found or access denied');
        }
        await this.repository.delete(id);
    }
};
exports.TypeOrmTodoRepository = TypeOrmTodoRepository;
exports.TypeOrmTodoRepository = TypeOrmTodoRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TypeOrmTodoRepository);
//# sourceMappingURL=typeorm-todo.repository.js.map