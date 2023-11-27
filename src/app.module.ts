import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthModule } from './resourses/auth/auth.module';
import { UserModule } from './resourses/user/user.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoModule } from './resourses/info/info.module';
import { LegalModule } from './resourses/legal/legal.module';
import { WorkModule } from './resourses/work/work.module';
import { FeedbackModule } from './resourses/feedback/feedback.module';
import { ContactModule } from './resourses/contact/contact.module';
import { MedicalModule } from './resourses/medical/medical.module';
import { ArticleModule } from './resourses/article/article.module';
import { TopicModule } from './resourses/topic/topic.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),

    MongooseModule.forRoot(appConfig().dbUrl, {
      // useNewUrlParser: true,
      // // useUnifiedTopology: true,
      dbName: appConfig().dbName,
    }),
    AuthModule,
    UserModule,
    InfoModule,
    LegalModule,
    WorkModule,
    FeedbackModule,
    ContactModule,
    MedicalModule,
    ArticleModule,
    TopicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
