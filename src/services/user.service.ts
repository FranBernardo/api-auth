import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Error, Model } from 'mongoose'
import { UnauthorizedException } from 'src/exceptions/unauthorized.exception'


import { User } from 'src/interfaces/user.interface'
@Injectable()
export class UserService  {
  constructor(@InjectModel('User', 'projeto-auth') private userModel: Model<User>) {}


  async findUser(email: string){
    return await this.userModel.findOne({ email })
  }

  async createUser(data: User) {
    try {
      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      data.password = await bcrypt.hash(data.password, salt)
      const isUser = await this.findUser(data.email)
      if(isUser){
       throw new UnauthorizedException('user ja cadastrado')
      }
      const createdUser = new this.userModel(data)
      const savedUser = await createdUser.save()
      Logger.debug('Usuário criado com sucesso:', savedUser)
      return savedUser
    } catch (error) {
      Logger.error('Erro ao criar usuário:', error)
      throw error
    }
  }

  async checkDatabaseConnection() {
    try {
      // Realiza uma consulta simples ao banco de dados
      const users = await this.userModel.find().limit(1).exec()
      Logger.debug('Conexão com o banco de dados bem-sucedida.')
      return users
    } catch (error) {
      Logger.error('Erro ao conectar ao banco de dados', error)
      throw new Error('Erro ao conectar ao banco de dados')
    }
  }
}
