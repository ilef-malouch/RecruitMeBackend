import { PickType } from '@nestjs/swagger';
import { authClientSignUpDto } from './authClientSignUp.dto';

export class authClientSignInDto extends PickType(authClientSignUpDto, ["Email","Password"]) {}
