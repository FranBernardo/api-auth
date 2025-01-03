import { HttpException, HttpStatus } from "@nestjs/common"

export class UnauthorizedException extends HttpException{
    constructor(detail: string){
        super(
            { message: 'Unauthorized access', detail }, 
            HttpStatus.UNAUTHORIZED
        )
    }
}