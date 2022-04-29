import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthrecruterService } from './authrecruter.service';
import { AuthRecruterSchema } from './models/auth-recruter.model';
import { JwtStrategyRecruter } from './strategy/jwt.strategy';
import { AuthrecruterController } from './authrecruter.controller';

@Module({
  imports:[
    JwtModule.register({
      secret:"secret",
      signOptions: {
      expiresIn: '24h',
      }
      }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{name:"authRecruter",schema:AuthRecruterSchema}]),
  ],
  providers: [AuthrecruterService,
              JwtStrategyRecruter
             ],
  controllers: [AuthrecruterController]
})
export class AuthrecruterModule {}
