import { PickType } from '@nestjs/swagger';
import { authRecruterSignUpDto } from './authRecruterSignUp.dto';


export class authRecruterSignInDto extends PickType(authRecruterSignUpDto, ["Email","Password"]) {}
