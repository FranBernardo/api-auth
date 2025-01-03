import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';  // Importe o módulo do usuário aqui

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/projeto-auth', {
      connectionName: 'projeto-auth', // Certifique-se de que o URL do MongoDB está correto
    }),
    UserModule,  // Importe o UserModule onde o modelo User está registrado
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
