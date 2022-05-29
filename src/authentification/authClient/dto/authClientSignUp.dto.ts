import {  IsEmail, IsNotEmpty, MinLength} from "class-validator" ;
import { Optional } from "class-validator-extended";

export  class authClientSignUpDto {
   
    id:string;
    
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    FamilyName:string;
    
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    FirstName:string;
    
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    Birthday:string;
    
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    Domaine:string;
    
    @Optional()
    GithubLink:string;
    @Optional()
    LinkedinLink:string;
    @Optional()
    PhoneNumber:number;
  
   
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    @IsEmail()
    Email:string ;
    
    Salt:string;
   
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    @MinLength(8,{
        message:"taille courte"
    }) 
    Password:string;
   
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    @MinLength(8,{
        message:"taille courte"
    }) 
    ConfirmPassword:string;
    
    @Optional()
    Type:string;
   
    Comment:string;
    
    Jwt:string;

   Image:string;

   Cv:string;
}

