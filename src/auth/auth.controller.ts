import { Controller ,Post , Get , Body} from '@nestjs/common';
import {AuthService} from './auth.service'

@Controller('auth')
export class AuthController {

    constructor(
        readonly authservice:AuthService
    ){}


    @Post('/signup')
    CreateUser(@Body() Data:{email:string , name:string , password:number}){
        return this.authservice.signup(Data.email, Data.name , Data.password)
    }

    @Post('/login')
    loginuser(@Body() Data:{email:string , password:number}){
        return this.authservice.login(Data.email, Data.password)
    }

   
}



