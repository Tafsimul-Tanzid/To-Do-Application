import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../common/guards';
import { User } from '../common/decorators';
import { TodoStatus } from '../common/enums';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@User() user: any, @Body() dto: CreateTodoDto) {
    return this.todosService.create(user.id, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@User() user: any, @Query('status') status?: TodoStatus) {
    return this.todosService.findAll(user.id, status);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@User() user: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.todosService.findOne(id, user.id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @User() user: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@User() user: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.todosService.remove(id, user.id);
  }
}
