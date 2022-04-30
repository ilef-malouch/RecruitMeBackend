import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type AuthClientDocument = AuthClient & Document;

@Schema()
export class AuthClient extends mongoose.Document{
   
    @Prop({required:true})
    FamilyName:string;
    @Prop({required:true})
    FirstName:string;
    @Prop({required:true})
    Birthday:string;
    @Prop({required:true})
    Domaine:string;
    @Prop()
    GithubLink:string;
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
export const AuthClientSchema = SchemaFactory.createForClass(AuthClient);

 