import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import mongoose from 'mongoose';
import { Document } from 'mongoose'; 
import { TypeContratEnum } from './enums/todo-status.enum';
export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop({required:true})
  poste: string; 
  @Prop({required:true})
  typeContrat: TypeContratEnum;
  @Prop()
  secteur : string; 
  @Prop()
  langue:string; 
  @Prop()
  genre:string;
  @Prop()  
  description:string;
  @Prop()
  competences:string;
  @Prop()
  dateExpiration:string;
  @Prop([String])
  motsCles: string[];
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  // recruter: Recruter;
}

export const JobSchema = SchemaFactory.createForClass(Job);