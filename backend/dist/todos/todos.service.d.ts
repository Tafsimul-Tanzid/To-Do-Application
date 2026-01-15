import { TodoRepository } from './interfaces/todo-repository.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '../entities/todo.entity';
import { TodoStatus } from '../common/enums';
export declare class TodosService {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    create(userId: string, createTodoDto: CreateTodoDto): Promise<Todo>;
    findAll(userId: string, status?: TodoStatus): Promise<Todo[]>;
    findOne(id: string, userId: string): Promise<Todo>;
    update(id: string, userId: string, updateTodoDto: UpdateTodoDto): Promise<Todo>;
    remove(id: string, userId: string): Promise<void>;
}
