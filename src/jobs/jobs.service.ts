import { Injectable } from '@nestjs/common';
import { Job, JobDocument } from './job.schema';
import { CreateJobDto } from './dtos/create-job-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JobDetails } from './job-details.interface';
@Injectable()
export class JobsService {
    constructor(@InjectModel('Job') private jobModel: Model<JobDocument>) { }
    _getJobDetails(job: JobDocument): JobDetails {
        return {
            id: job._id,
            poste: job.poste,
            typeContrat: job.typeContrat,
            secteur: job.secteur,
            langue: job.langue,
            genre: job.genre,
            description: job.description,
            competences: job.competences,
            dateExpiration: job.dateExpiration,
            motsCles: job.motsCles
        };
    }
    async create(job: CreateJobDto): Promise<JobDetails> {
        const createdJob = new this.jobModel({
            poste: job.poste,
            typeContrat: job.typeContrat,
            secteur: job.secteur,
            langue: job.langue,
            genre: job.genre,
            description: job.description,
            competences: job.competences,
            dateExpiration: job.dateExpiration,
            motsCles: job.motsCles
        });
        createdJob.save()
        console.log(createdJob);
        
        return this._getJobDetails(createdJob );
    }

    async findAll(): Promise<Job[]> {
        return this.jobModel.find().exec();
    }
}
