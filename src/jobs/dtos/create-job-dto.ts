import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { TypeContratEnum } from "../enums/todo-status.enum";


export class CreateJobDto {
    @IsNotEmpty({ message: "Priére d'entrer le poste " })
    poste: string;
    @IsNotEmpty({ message: "Priére d'entrer le type de contrat" })
    typeContrat: TypeContratEnum;  
    @IsOptional()
    secteur: string; 
    @IsOptional()
    langue: string; 
    @IsOptional()
    genre: string;
    @IsOptional()
    description: string;
    @IsOptional()
    competences: string;
    @IsOptional()
    dateExpiration: string;
    @IsOptional()
    @Prop([String])
    @IsOptional()
    motsCles: string[];
}