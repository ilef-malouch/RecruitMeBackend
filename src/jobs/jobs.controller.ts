import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentification/authClient/guads/JwtGuard.guard';
import { GetRecruter } from 'src/authentification/authRecruter/decorateur/getUser.paramDecorater'; 
import { CreateJobDto } from './dtos/create-job-dto';
import { JobDetails } from './job-details.interface'; 
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
    constructor(private jobsService: JobsService) { }
    @Post('add-job')
    @UseGuards(JwtAuthGuard)
    addJob(@Body() createJobDto: CreateJobDto,
        @GetRecruter() recruter
    ): Promise<JobDetails | null> {
        return this.jobsService.create(createJobDto, recruter);
    }
    @Get()
    getJobs() {
        return this.jobsService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobsService.findOne(id);
    }

    @Get("sector/:sector")
    getJobsBySector(@Param("sector") secteur:any) {
        return this.jobsService.findBySector(secteur);
    }
    

    @Get("contract/:contract")
    getJobsByContract(@Param("contract") contract:any) {
        return this.jobsService.findByContract(contract);
    }
}
