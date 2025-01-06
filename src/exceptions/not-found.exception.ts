import { HttpException, HttpStatus } from "@nestjs/common"

export class NotFoundException extends HttpException{
    constructor(detail: string){
        super(
            { message: 'not found', detail }, 
            HttpStatus.NOT_FOUND
        )
    }
}