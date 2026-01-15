import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { TodoRepository, TODO_REPOSITORY } from './interfaces/todo-repository.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '../entities/todo.entity';
import { TodoStatus } from '../common/enums';

@Injectable()
export class TodosService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
  ) {}

  async create(userId: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.create({
      ...createTodoDto,
      userId,
    });
  }

  async findAll(userId: string, status?: TodoStatus): Promise<Todo[]> {
    return this.todoRepository.findAll(userId, status);
  }

  async findOne(id: string, userId: string): Promise<Todo> {
    const todo = await this.todoRepository.findById(id, userId);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: string, userId: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    // Check if todo exists 
    const existingTodo = await this.todoRepository.findById(id, userId);
    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return this.todoRepository.update(id, userId, updateTodoDto);
  }

  async remove(id: string, userId: string): Promise<void> {
    const todo = await this.todoRepository.findById(id, userId);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.delete(id, userId);
  }
}
