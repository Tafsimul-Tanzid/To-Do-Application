import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatus } from '../../common/enums';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsEnum(TodoStatus, { message: 'Status must be PENDING, IN_PROGRESS, or DONE' })
  @IsOptional()
  status?: TodoStatus;
}
