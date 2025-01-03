
import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/server/database';


@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
