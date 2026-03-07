import { Controller, Get } from '@nestjs/common';

@Controller('api/slots')
export class SlotsController {
  @Get()
  getslots() {
    //Mock réaliste pour tester le front
    return [
      { date: '2026-01-28', times: ['09:00', '10:00', '11:00'] },
      { date: '2026-01-29', times: ['14:00', '15:00', '16:00'] },
      { date: '2026-01-30', times: [] }, // journée full / indispo
    ];
  }
}
