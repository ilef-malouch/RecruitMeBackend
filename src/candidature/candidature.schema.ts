import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer'; 
import mongoose from 'mongoose';
import { Document } from 'mongoose'; 
import { AuthClient } from 'src/authentification/authClient/models/auth-client.model'; 
import { Job } from 'src/jobs/job.schema';
export type CandidatureDocument = Candidature & Document;

@Schema()
export class Candidature {
  @Prop({required:true})
  email: string; 
  @Prop({required:true})
  phone: number;
  @Prop()
  cv:string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'authClient' })
  @Type(() => AuthClient)
  candidat: AuthClient ;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'job' })
  @Type(() => Job)
  offre: Job ;
}

export const CandidatureSchema = SchemaFactory.createForClass(Candidature);