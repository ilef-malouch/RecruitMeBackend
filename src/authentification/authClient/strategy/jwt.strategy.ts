import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthclientService } from "../authclient.service";



@Injectable()
export class JwtStrategyClient extends PassportStrategy(Strategy,'jwt') {
  authClientService:AuthclientService ;
  constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:"secret",
      });
    }
   async validate(payload:any) {
   
      return this.authClientService.verifyClient(payload)
     }
  
   
}