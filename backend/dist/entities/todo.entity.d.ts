import { User } from './user.entity';
import { TodoStatus } from '../common/enums';
export declare class Todo {
    id: string;
    title: string;
    description: string;
    status: TodoStatus;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: User;
}
