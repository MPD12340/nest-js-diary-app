import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO, UpdateTaskDto } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/get-tasks-filter.dto';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { StatusValidationPipe } from './pipes/task-status-validation.pipe';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: FilterTaskDTO): Task[] {
    if (Object.keys(filterDto).length > 0) {
      return this.taskService.getFilteredTasks(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDTO) {
    return this.taskService.createTask(createTaskDto);
  }

  @Put('/:id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTaskById(id, updateTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    const msg = this.taskService.deleteTaskById(id);
    return msg;
  }
  @Patch('/change-status/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', StatusValidationPipe) status: TaskStatus,
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }
}
