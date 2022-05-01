import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type AuthRecruterDocument = AuthRecruter & Document;

@Schema()
export class AuthRecruter extends mongoose.Document{
   
    @Prop({required:true})
    CompagnyName:string;
    @Prop({required:true})
    IdCompagny:string;
    @Prop({required:true})
    Domaine:string;
    @Prop()
    FacebookLink:string;
    @Prop()
    LinkedinLink:string;
    @Prop()
    PhoneNumber:string;
    @Prop({required:true,IsEmail:true})
    Email:string;
    @Prop()
    Salt:string;
    @Prop({required:true})
    Password:string;
    @Prop({required:true})
    ConfirmPassword:string;
    @Prop({required:true})
    Type:string;
    @Prop()
    Comment:string;
    @Prop()
    Jwt:string;
    @Prop()
    Image:string;

}
export const AuthRecruterSchema = SchemaFactory.createForClass(AuthRecruter);

 