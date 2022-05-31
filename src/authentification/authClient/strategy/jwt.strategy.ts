import { Injectable, UnauthorizedException } from "@nestjs/common";
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
   
    const user = await this.authClientService.findClientByEmail(
      payload.email,
    );
    console.log("maaail",payload.email);
    
    if (!user) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    return user;
      // return this.authClientService.verifyClient(payload)
     }
  
   
}