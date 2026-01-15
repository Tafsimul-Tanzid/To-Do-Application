import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from '../../entities/todo.entity';
import { TodoRepository } from '../interfaces/todo-repository.interface';
import { TodoStatus } from '../../common/enums';

@Injectable()
export class TypeOrmTodoRepository implements TodoRepository {
  constructor(private readonly repository: Repository<Todo>) {}

  async create(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = this.repository.create({
      title: todo.title!,
      description: todo.description,
      status: todo.status || TodoStatus.PENDING,
      userId: todo.userId!,
    });
    return this.repository.save(newTodo);
  }

  async findAll(userId: string, status?: TodoStatus): Promise<Todo[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId })
      .orderBy('todo.createdAt', 'DESC');

    if (status) {
      queryBuilder.andWhere('todo.status = :status', { status });
    }

    return queryBuilder.getMany();
  }

  async findById(id: string, userId: string): Promise<Todo | null> {
    return this.repository.findOne({
      where: { id, userId },
    });
  }

  async update(id: string, userId: string, data: Partial<Todo>): Promise<Todo> {
    // Verify users before updating
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

    return this.repository.findOne({ where: { id } }) as Promise<Todo>;
  }

  async delete(id: string, userId: string): Promise<void> {
    // Check ownership
    const todo = await this.repository.findOne({
      where: { id, userId },
    });

    if (!todo) {
      throw new Error('Todo not found or access denied');
    }

    await this.repository.delete(id);
  }
}
