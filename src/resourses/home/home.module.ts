import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Home, HomeSchema } from 'src/schemas';

@Module({
  imports: [MongooseModule.forFeature([{name: Home.name, schema: HomeSchema}])],
  controllers: [HomeController]
})
export class HomeModule {}
