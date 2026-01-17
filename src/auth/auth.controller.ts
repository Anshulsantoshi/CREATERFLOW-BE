import { Controller ,Post , Get , Body} from '@nestjs/common';
import {AuthService} from './auth.service'

@Controller('auth')
export class AuthController {

    constructor(
        readonly authservice:AuthService
    ){}


    @Post('/signup')

    CreateUser(@Body() Data:{email:string , name:string}){
        return this.authservice.signup(Data.email, Data.name)
    }
}



