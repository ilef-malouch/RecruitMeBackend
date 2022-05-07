import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './job.schema';
import { JobsService } from './jobs.service';
@Module({
    imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
    controllers: [JobsController],
    providers: [JobsService], 
    exports : [JobsService],
})
export class JobsModule {}
