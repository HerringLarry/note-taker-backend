import { Controller, Get } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {

    constructor( private _coursesService: CoursesService ) {}

    @Get()
    async findAll() {
        return await this._coursesService.findAll();
    }
}