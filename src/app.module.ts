import { AuthclientModule } from './authentification/authClient/authclient.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsController } from './jobs/jobs.controller';
import { JobsModule } from './jobs/jobs.module';
import { AuthrecruterModule } from './authentification/authRecruter/authrecruter.module';
import { CandidatureController } from './candidature/candidature.controller';
 import { CandidatureModule } from './candidature/candidature.module'; 
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://zaineb:zaineb@cluster0.x0r5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"),
    AuthclientModule,
    AuthrecruterModule,
    CandidatureModule,
    JobsModule],
  controllers: [AppController, JobsController,CandidatureController],
  providers: [AppService],
})
export class AppModule { }
