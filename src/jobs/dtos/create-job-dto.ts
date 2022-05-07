import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';


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
    @IsOptional()
    description: string;
    @IsOptional()
    @Prop()
    @IsOptional()
    competences: string;
    @Prop()
    @IsOptional()
    dateExpiration: string;
    @IsNotEmpty({ message: "Priére d'entrer les mots clés " })
    @Prop([String])
    @IsOptional()
    motsCles: string[];
}