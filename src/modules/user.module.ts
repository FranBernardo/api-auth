import { Module } from '@nestjs/common'
import { UserController } from 'src/controllers/user.controller'
import { UserService } from 'src/services/user.service'
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature(
      [ { name: 'User', schema: UserSchema} ],
      'projeto-auth',
  )
  ],
  controllers: [ UserController],
  providers: [ UserService],
})
export class UserModule {}
