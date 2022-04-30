import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthrecruterService } from "../authrecruter.service";




@Injectable()
export class JwtStrategyRecruter extends PassportStrategy(Strategy,'jwt') {
  authRecruterService:AuthrecruterService ;
  constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:"secret",
      });
    }
   async validate(payload:any) {
   
      return this.authRecruterService.verifyRecruter(payload)
     }
  
   
}