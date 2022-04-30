import { Module } from '@nestjs/common';
import { AuthclientService } from './authclient.service';
import { AuthclientController } from './authclient.controller';
import { JwtStrategyClient } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthClientSchema } from './models/auth-client.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    JwtModule.register({
      secret:"secret",
      signOptions: {
      expiresIn: '24h',
      }
      }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{name:"authClient",schema:AuthClientSchema}]),
  ],
  providers: [AuthclientService,
              JwtStrategyClient,
              ],
  controllers: [AuthclientController]
})
export class AuthclientModule {}
