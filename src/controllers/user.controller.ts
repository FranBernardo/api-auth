import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common"
import { User } from "src/interfaces/user.interface"
import { UserService } from "src/services/user.service"

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
