import { Module } from '@nestjs/common';
import { AppController } from 'src/controllers/app.controller';
import { UserController } from 'src/controllers/user.controller';
import { AppService } from 'src/services/app.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
