import { Optional } from "@nestjs/common";
import {  IsEmail, IsEmpty, IsNotEmpty, MinLength} from "class-validator" ;

export  class authRecruterSignUpDto {
   
    id:string;
    
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    CompagnyName:string;
    
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    IdCompagny:string;
    
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    Domaine:string;

    @IsEmpty()
    FacebookLink:string;
    @IsEmpty()
    LinkedinLink:string;
    @IsEmpty()
    PhoneNumber:string;
    
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
    
    @IsNotEmpty()
    Type:string;
   
    Comment:string;
    
    Jwt:string;

   Image:string;
}

