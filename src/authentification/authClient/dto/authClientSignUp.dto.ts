import {  IsEmail, IsNotEmpty, IsOptional, MinLength} from "class-validator" ;

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
    @IsOptional()
    GithubLink:string;
    @IsOptional()
    LinkedinLink:string;
    @IsOptional()
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
    @IsNotEmpty()
    Type:string;
   
    Comment:string;
    
    Jwt:string;

   Image:string;

   Cv:string;
}

