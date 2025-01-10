import { Body, Controller, Get, HttpCode, Logger, Param, Patch, Post, Put } from "@nestjs/common"
import { UpedateUser, User } from "src/interfaces/user.interface"
import { UserService } from "src/services/user.service"

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}


  // ATE ROTAS PRIVADAS AQI
  
  @Post("/create/user")
  @HttpCode(201)
  async create(@Body() user: User) {
    const data = user
    const response = await this.userService.createUser(data)
    return response
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() login: User){
    const info = login
    const response = await this.userService.login(info)
    return response
  }

  @Patch('/update/:id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() upedateUser: UpedateUser ){
    const response = await this.userService.update(id, upedateUser)
    return response
  }

  @Get('user/:id')
  
  @HttpCode(200)
  async getUser(@Param('id') id: string){
    const response = await this.userService.findUser(id)
    return response
  }

  @Get('check-connection')
  async checkConnection(): Promise<any> {
    try {
      // Verifica se a conexão com o MongoDB está ativa
      const result = await this.userService.checkDatabaseConnection();
      return { message: 'Conexão com o banco de dados bem-sucedida', data: result };
    } catch (error) {
      return { message: 'Erro ao conectar ao banco de dados', error: error.message };
    }
  }
}
