import {  IsEmail, IsNotEmpty, MinLength} from "class-validator" ;

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

    FacebookLink:string;
    LinkedinLink:string;
    PhoneNumber:string;
    
    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
        })
    Domaine:string;
  
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
    
    Type:string;
   
    Comment:string;
    
    Jwt:string;

   Image:string;
}

