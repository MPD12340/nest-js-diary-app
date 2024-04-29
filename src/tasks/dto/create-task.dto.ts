import {IsNotEmpty} from 'class-validator'
export class CreateTaskDTO {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description: string;
}
export class UpdateTaskDto {
    title: string;
    description: string;
}