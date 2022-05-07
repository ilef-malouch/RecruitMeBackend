import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateJobDto } from './dtos/create-job-dto';
import { Job } from './job.schema';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
    constructor(private   jobsService:JobsService){}
    @Post('add-job')
    addJob(@Body() createJobDto:CreateJobDto):Promise<Job| null>{
        return  this.jobsService.create(createJobDto);
    }
    @Get()
    getJobs():Promise<Job[]>{
        return this.jobsService.findAll();
    }
}
