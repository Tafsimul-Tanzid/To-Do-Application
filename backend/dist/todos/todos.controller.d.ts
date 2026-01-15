import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from '../common/enums';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(user: any, dto: CreateTodoDto): Promise<import("../entities").Todo>;
    findAll(user: any, status?: TodoStatus): Promise<import("../entities").Todo[]>;
    findOne(user: any, id: string): Promise<import("../entities").Todo>;
    update(user: any, id: string, dto: UpdateTodoDto): Promise<import("../entities").Todo>;
    remove(user: any, id: string): Promise<void>;
}
