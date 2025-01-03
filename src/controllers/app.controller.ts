import { Controller, Get, Logger } from '@nestjs/common'
import { AppService } from '../services/app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const t = 'faz'
    Logger.debug('teste', { t })
    return this.appService.getHello()
  }
}
