import { Injectable, Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import * as bcrypt from "bcrypt"
import { Error, Model, Types } from "mongoose"
import { NotFoundException } from "src/exceptions/not-found.exception"
import { UnauthorizedException } from "src/exceptions/unauthorized.exception"
import { UpedateUser, User } from "src/interfaces/user.interface"
import { genereteToken } from "./auth.service"
@Injectable()
export class UserService {
  constructor(
    @InjectModel("User", "projeto-auth") private userModel: Model<User>,
  ) {}

  async findUserEmail(email: string) {
    return await this.userModel.findOne({ email })
  }

  async findUser(id: string){
    return await this.userModel.findById({_id: id})
  }
  async createUser(data: User) {
    try {
      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      data.password = await bcrypt.hash(data.password, salt)
      const isUser = await this.findUserEmail(data.email)
      if (isUser) {
        throw new UnauthorizedException("user ja cadastrado")
      }
      const createdUser = new this.userModel(data)
      const savedUser = await createdUser.save()
      Logger.debug("Usuário criado com sucesso:", savedUser)
      return savedUser
    } catch (error) {
      Logger.error("Erro ao criar usuário:", error)
      throw error
    }
  }

  async login(data: User) {
    const User = await this.findUserEmail(data.email)
      if (!User) {
        throw new NotFoundException("user nao encontrado")
      }

    const isPassword = await bcrypt.compare(data.password, User.password)

    if(!isPassword){
      throw new NotFoundException("credencial invalida")
    }
    const tokenLogin  = await genereteToken(User)
    
    return {
      token: tokenLogin,
      id: User._id,
      name: User.userName,
      email: User.email,
      status: User.status
    }
    
  }

  async update(id: string, data: UpedateUser){
    Logger.debug('data', data)

    const user = await this.findUser(id)
    if(!user){
      throw new NotFoundException("user nao encontrado")
    }

    const updateUser = await this.userModel.updateOne(
      {_id: id},
      {$set: data}
    )
    return updateUser
  }

  async checkDatabaseConnection() {
    try {
      // Realiza uma consulta simples ao banco de dados
      const users = await this.userModel.find().limit(1).exec()
      Logger.debug("Conexão com o banco de dados bem-sucedida.")
      return users
    } catch (error) {
      Logger.error("Erro ao conectar ao banco de dados", error)
      throw new Error("Erro ao conectar ao banco de dados")
    }
  }
}
