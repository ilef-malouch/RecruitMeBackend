 import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator'; 

export class CreateCandidatureDto {
    @IsNotEmpty()
    phone : string;

    @IsNotEmpty({
        message: "Vous devez spécifier une valeur"
    })
    @IsEmail()
    email: string;

    cv: string;
}