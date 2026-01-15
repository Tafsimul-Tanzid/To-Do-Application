"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todos_service_1 = require("./todos.service");
const todos_controller_1 = require("./todos.controller");
const todo_entity_1 = require("../entities/todo.entity");
const typeorm_todo_repository_1 = require("./repositories/typeorm-todo.repository");
const todo_repository_interface_1 = require("./interfaces/todo-repository.interface");
let TodosModule = class TodosModule {
};
exports.TodosModule = TodosModule;
exports.TodosModule = TodosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([todo_entity_1.Todo])],
        controllers: [todos_controller_1.TodosController],
        providers: [
            {
                provide: todo_repository_interface_1.TODO_REPOSITORY,
                useFactory: (repository) => {
                    return new typeorm_todo_repository_1.TypeOrmTodoRepository(repository);
                },
                inject: [(0, typeorm_1.getRepositoryToken)(todo_entity_1.Todo)],
            },
            todos_service_1.TodosService,
        ],
    })
], TodosModule);
//# sourceMappingURL=todos.module.js.map