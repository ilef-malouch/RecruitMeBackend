import { Module } from '@nestjs/common';
import { CandidatureController } from './candidature.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidature, CandidatureSchema } from './candidature.schema';
import { CandidatureService } from './candidature.service';
@Module({
    imports: [MongooseModule.forFeature([{ name: Candidature.name, schema: CandidatureSchema }])],
    controllers: [CandidatureController],
    providers: [CandidatureService], 
    exports : [CandidatureService],
})
export class CandidatureModule {}
