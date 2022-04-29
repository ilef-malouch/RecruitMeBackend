import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';


export class CreateJobDto {
    @IsNotEmpty({ message: "Priére d'entrer le poste " })
    poste: string;
    @IsNotEmpty({ message: "Priére d'entrer le type " })
    type: string;  
    @IsNotEmpty({ message: "Priére d'entrer le poste " })
    niveauEtude: string; 
    @IsNotEmpty({ message: "Priére d'entrer le poste " })
    langue: string; 
    @IsNotEmpty({ message: "Priére d'entrer le poste " })
    genre: string;
    description: string;
    competences: string;
    dateExpiration: string;
    @Prop([String])
    motsCles: string[];
}