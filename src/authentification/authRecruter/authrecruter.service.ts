import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthRecruter, AuthRecruterDocument } from './models/auth-recruter.model';
import { authRecruterSignInDto } from './dto/authRecruterSignIn.dto';
import { RequiredException } from './exceptions/Required.exception';
import * as bcrypt from "bcrypt";
import { authRecruterSignUpDto } from './dto/authRecruterSignUp.dto';
import { UnconfirmException } from './exceptions/confirm.exception';
import { ExistingEmailException } from './exceptions/ExistingEmail.exception';

@Injectable()
export class AuthrecruterService {
    constructor(@InjectModel("authRecruter") private authRecruterModel: Model<AuthRecruterDocument>,private jwtService:JwtService){}
    
    async insertRecruter(createAuthRecruterDto:any): Promise<AuthRecruter>{
        
        const createdRecruter =new this.authRecruterModel(createAuthRecruterDto);
       
        return await createdRecruter.save();
    }

    async getRecruters(){
        const Recruters =await this.authRecruterModel.find().exec();
        return Recruters ;
    }
    
    async updatePicture(jwt:string, imageName:string){
        const client =await this.findRecruterByJWT(jwt); 
        client.Image="http://localhost:8000/authrecruter/"+imageName ;
        client.save() ;
        return client ;
    }

    async findRecruterByEmail(email:string):Promise<AuthRecruter>{
        const Recruter =await this.authRecruterModel.findOne({"Email":email});
        if(Recruter){
            return Recruter ;
        }
    }
    
    async findRecruterByJWT(jwt:string):Promise<AuthRecruter>{
        
        const Recruter =await this.authRecruterModel.findOne({"Jwt":jwt});
        if(Recruter){
            return Recruter ;
        }
    }
    
    async signInRecruter(dto:authRecruterSignInDto){
        
        if(!dto.Password || !dto.Email) throw new RequiredException();
        
        const Recruter =await this.findRecruterByEmail(dto.Email);
        
        const mdp =await bcrypt.compare(dto.Password,Recruter.Password);
      
        if(!mdp) throw new UnauthorizedException('Credentials incorrect');
        
        const token =await this.signRecruter(dto.Email, "Recruter")
       
        this.updateRecruterByJWT(dto,token);
        
        return token ;
  
    }
    
    async updateRecruterByJWT(dto:authRecruterSignInDto,jwt:string){
  
        const updatedRecruter =await this.findRecruterByEmail(dto.Email);
        
        updatedRecruter.Jwt=jwt;
       
        return updatedRecruter.save();
    }

    
    async signUpRecruter(dto:authRecruterSignUpDto){
        
        const Recruter = await this.findRecruterByEmail(dto.Email);
       
        if(!Recruter){
            if(dto.ConfirmPassword === dto.Password){
                dto.Salt = await bcrypt.genSalt();
                dto.Password = await bcrypt.hash (dto.Password, dto.Salt);
                dto.ConfirmPassword = await bcrypt.hash (dto.Password, dto.Salt);
                const token = await this.signRecruter(dto.Email,"Recruter");
                dto.Jwt=token ;
                this.insertRecruter(dto) ;
                return token ;
            }
            else {
               throw new UnconfirmException();
            }
        }
        else{
            throw new ExistingEmailException()
        }
    }

    async signRecruter(email:string ,sub:string){
        return this.jwtService.sign({
            sub:sub,
            email
        });
    }

    async signoutRecruter(jwt:string){
        const Recruter =this.findRecruterByJWT(jwt);
        (await Recruter).Jwt="";
        console.log(Recruter);
    }

    async verifyRecruter(token:any){
        return await this.findRecruterByEmail(token.email)
    }
}
