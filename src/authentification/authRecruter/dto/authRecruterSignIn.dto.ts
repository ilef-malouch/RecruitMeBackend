 import { PickType } from '@nestjs/swagger';
// import { PickType } from '@nestjs/mapped-types'; 
import { authRecruterSignUpDto } from './authRecruterSignUp.dto';


export class authRecruterSignInDto extends PickType(authRecruterSignUpDto, ["Email","Password"]) {}
