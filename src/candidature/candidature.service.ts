import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthClient } from 'src/authentification/authClient/models/auth-client.model';
import { CreateCandidatureDto } from './candidature-dto';
import { CandidatureDetails } from './candidature.interface';
import { CandidatureDocument, Candidature } from './Candidature.schema';
import { Model } from 'mongoose';

@Injectable()
export class CandidatureService {
    constructor(@InjectModel('Candidature') private candidatureModel: Model<CandidatureDocument>) { }
    _getCandidatureDetails(candidature: CandidatureDocument): CandidatureDetails {
        return {
            id: candidature._id,
            email: candidature.email,
            phone: candidature.phone,
            cv: candidature.cv
        };
    }

    async create(candidature: CreateCandidatureDto, client: AuthClient,cv?:any): Promise<CandidatureDetails> {
        const createdCandidature = new this.candidatureModel({
            email: candidature.email,
            phone: candidature.phone,
            cv: candidature.cv,
            offre: candidature.offre,
            client
        });
        createdCandidature.save()
        console.log(createdCandidature);

        return this._getCandidatureDetails(createdCandidature);
    }
    async findAllByRecruter(id : string) {
        return this.candidatureModel.find( {offre:id} ).exec();
    }
    async findAll() {
        return this.candidatureModel.find().populate('client').exec();
    }

    async findOne(id: string) {
        return this.candidatureModel.findById(id).populate('client').exec();
    }

   
}
