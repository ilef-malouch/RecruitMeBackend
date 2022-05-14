import { TypeContratEnum } from "./enums/todo-status.enum";

export interface JobDetails {
  id: string;
  poste: string;
  typeContrat: TypeContratEnum;
  secteur: string;
  langue: string;
  genre: string;
  description: string;
  competences:string;
  dateExpiration:string; 
  motsCles: string[];
}
