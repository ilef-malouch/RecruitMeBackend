import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Job } from 'src/jobs/job.schema';

export type AuthRecruterDocument = AuthRecruter & Document;

@Schema()
export class AuthRecruter extends mongoose.Document {

    @Prop({ required: true })
    CompagnyName: string;
    @Prop({ required: true })
    IdCompagny: string;
    @Prop({ required: true })
    Domaine: string;
    @Prop()
    FacebookLink: string;
    @Prop()
    LinkedinLink: string;
    @Prop()
    PhoneNumber: string;
    @Prop({ required: true, IsEmail: true })
    Email: string;
    @Prop()
    Salt: string;
    @Prop({ required: true })
    Password: string;
    @Prop({ required: true })
    ConfirmPassword: string;
    @Prop()
    Type: string;
    @Prop()
    Comment: string;
    @Prop()
    Jwt: string;
    @Prop()
    Image: string;

    @Type(() => Job)
    posts: Job[];

}
export const AuthRecruterSchema = SchemaFactory.createForClass(AuthRecruter);

