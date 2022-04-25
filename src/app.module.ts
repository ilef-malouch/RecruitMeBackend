import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobOfferModule } from './job-offer/job-offer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsController } from './jobs/jobs.controller';
import { JobsModule } from './jobs/jobs.module';
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://salma:salma@cluster0.eeaxx.mongodb.net/recrutmeDAtabase?retryWrites=true&w=majority"),
    JobOfferModule,
    JobsModule],
  controllers: [AppController, JobsController],
  providers: [AppService],
})
export class AppModule {}
