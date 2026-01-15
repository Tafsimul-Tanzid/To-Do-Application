import { Repository } from 'typeorm';
import { Todo } from '../../entities/todo.entity';
import { TodoRepository } from '../interfaces/todo-repository.interface';
import { TodoStatus } from '../../common/enums';
export declare class TypeOrmTodoRepository implements TodoRepository {
    private readonly repository;
    constructor(repository: Repository<Todo>);
    create(todo: Partial<Todo>): Promise<Todo>;
    findAll(userId: string, status?: TodoStatus): Promise<Todo[]>;
    findById(id: string, userId: string): Promise<Todo | null>;
    update(id: string, userId: string, data: Partial<Todo>): Promise<Todo>;
    delete(id: string, userId: string): Promise<void>;
}
