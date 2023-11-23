import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Info, InfoSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Info.name, schema: InfoSchema }]),
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
