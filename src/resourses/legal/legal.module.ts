import { Module } from '@nestjs/common';
import { LegalController } from './legal.controller';
import { LegalService } from './legal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Legal, LegalSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Legal.name, schema: LegalSchema }]),
  ],
  controllers: [LegalController],
  providers: [LegalService],
})
export class LegalModule {}
