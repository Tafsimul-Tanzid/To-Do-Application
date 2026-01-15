import { Todo } from './todo.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    todos: Todo[];
}
