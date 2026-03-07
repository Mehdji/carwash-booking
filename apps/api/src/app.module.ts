import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlotsController } from './slots/slots.controller';

@Module({
  imports: [],
  controllers: [AppController, SlotsController],
  providers: [AppService],
})
export class AppModule {}
