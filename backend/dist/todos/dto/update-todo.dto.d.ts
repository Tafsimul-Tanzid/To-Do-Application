import { CreateTodoDto } from './create-todo.dto';
import { TodoStatus } from '../../common/enums';
declare const UpdateTodoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTodoDto>>;
export declare class UpdateTodoDto extends UpdateTodoDto_base {
    status?: TodoStatus;
}
export {};
