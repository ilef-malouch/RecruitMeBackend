import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthClient, AuthClientDocument } from './models/auth-client.model';
import { InjectModel } from '@nestjs/mongoose'; 
import  { JwtService } from '@nestjs/jwt';
import { authClientSignInDto } from './dto/authClientSignIn.dto';
import { RequiredException } from './exceptions/Required.exception';
import * as bcrypt from 'bcrypt';
import { authClientSignUpDto } from './dto/authClientSignUp.dto';
import { UnconfirmException } from './exceptions/confirm.exception';
import { ExistingEmailException } from './exceptions/ExistingEmail.exception';

@Injectable()
export class AuthclientService {
    constructor(@InjectModel("authClient") private authClientModel: Model<AuthClientDocument>,private jwtService:JwtService){}
    
    async insertClient(createAuthClientDto:any): Promise<AuthClient>{
        
        const createdClient =new this.authClientModel(createAuthClientDto);
       
        return await createdClient.save();
    }

    async getClients(){
        const Clients =await this.authClientModel.find().exec();
        return Clients ;
    }
    
    async findClientByEmail(email:string):Promise<AuthClient>{
        const Client =await this.authClientModel.findOne({"Email":email});
        if(Client){
            return Client ;
        }
    }
    
    async findClientByJWT(jwt:string):Promise<AuthClient>{
        
        const Client =await this.authClientModel.findOne({"Jwt":jwt});
        if(Client){
            return Client ;
        }
    }
    
    async signInClient(dto:authClientSignInDto){
        
        if(!dto.Password || !dto.Email) throw new RequiredException();
        
        const Client =await this.findClientByEmail(dto.Email);
        
        const mdp =await bcrypt.compare(dto.Password,Client.Password);
      
        if(!mdp) throw new UnauthorizedException('Credentials incorrect');
        
        const token =await this.signClient(dto.Email, "Client")
       
        this.updateClientByJWT(dto,token);
        
        return token ;
  
    }
    
    async updateClientByJWT(dto:authClientSignInDto,jwt:string){
  
        const updatedClient =await this.findClientByEmail(dto.Email);
        
        updatedClient.Jwt=jwt;
       
        return updatedClient.save();
    }

    
    async signUpClient(dto:authClientSignUpDto){
        
        const Client = await this.findClientByEmail(dto.Email);
       
        if(!Client){
            if(dto.ConfirmPassword === dto.Password){
                dto.Salt = await bcrypt.genSalt();
                dto.Password = await bcrypt.hash (dto.Password, dto.Salt);
                dto.ConfirmPassword = await bcrypt.hash (dto.Password, dto.Salt);
                const token = await this.signClient(dto.Email,"Client");
                dto.Jwt=token ;
                this.insertClient(dto) ;
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

    async signClient(email:string ,sub:string){
        return this.jwtService.sign({
            sub:sub,
            email
        });
    }

    async signoutClient(jwt:string){
        const client =this.findClientByJWT(jwt);
        (await client).Jwt="";
        console.log(client);
    }

    async verifyClient(token:any){
        return await this.findClientByEmail(token.email)
    }
}
