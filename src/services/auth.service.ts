import { Logger } from "@nestjs/common"
import { randomBytes } from "crypto"
import { jwtVerify, SignJWT } from "jose"
import { User } from "src/interfaces/user.interface"


const secretKey = randomBytes(32)

export const genereteToken = async (data: User) =>{
    
    
    const result = await new SignJWT({data})
    .setProtectedHeader({ alg: 'HS256'})
    .setExpirationTime('30m')
    .sign(secretKey)
Logger.debug({result})
 return result
}

const verifyToken = async(token: string)=> {
    const result = await jwtVerify(token, secretKey)

    return result
} 