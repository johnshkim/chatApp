import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://john:321@clusterdesafio.z6hwr.mongodb.net/test'),ConfigModule.forRoot({ isGlobal: true }),
  SendGridModule.forRoot({
    apikey: process.env.SENDGRID_API_KEY,
  }),
    DatabaseModule,
    UserModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
