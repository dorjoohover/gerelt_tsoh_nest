import { Global, Module } from '@nestjs/common';


import { AuthModule } from './resourses/auth/auth.module';
import { UserModule } from './resourses/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { MailerModule } from '@nestjs-modules/mailer';
@Global()
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
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.ethereal.email',
          port: 587,
          service: 'gmail',
          auth: {
            user: 'dorjoohover@gmail.com',
            pass: 'qwrn ysyk prkg iuls',
          },
        },
        defaults: {
          from: 'dorjoohover@gmail.com',
        },
      }),
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
  providers: [],
})
export class AppModule {}
