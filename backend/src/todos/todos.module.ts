import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo } from '../entities/todo.entity';
import { TypeOrmTodoRepository } from './repositories/typeorm-todo.repository';
import { TODO_REPOSITORY } from './interfaces/todo-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [
    {
      provide: TODO_REPOSITORY,
      useFactory: (repository: Repository<Todo>) => {
        return new TypeOrmTodoRepository(repository);
      },
      inject: [getRepositoryToken(Todo)],
    },
    TodosService,
  ],
})
export class TodosModule {}
