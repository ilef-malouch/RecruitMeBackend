import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop({required:true})
  poste: string;

  @Prop({required:true})
  type: string;

  @Prop()
  niveauEtude : string;
  @Prop({required:true})
  langue:string;
  @Prop({required:true})
  genre:string;

  description:string;
  competences:string;
  dateExpiration:string;
  @Prop([String])
  motsCles: string[];
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
//   recruter: Recruter;
}

export const JobSchema = SchemaFactory.createForClass(Job);