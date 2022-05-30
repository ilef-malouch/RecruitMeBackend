import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthrecruterService } from "../authrecruter.service";




@Injectable()
export class JwtStrategyRecruter extends PassportStrategy(Strategy,'jwt') {
  
  constructor( private authRecruterService:AuthrecruterService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:"secret",
      });
    }
   async validate(payload:any) {
     console.log(payload);
     
    const user = await this.authRecruterService.findRecruterByEmail(
      payload.email,
    );
    if (!user) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    return user;
      // return this.authRecruterService.verifyRecruter(payload)
     }
  
   
}