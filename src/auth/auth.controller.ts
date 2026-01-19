import { Controller ,Post , Get , Body , UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service'
import { CurrentUser } from './user.decorator';
import {JwtStrategy} from  './jwt.strategy'
import { AuthGuard } from '@nestjs/passport'

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

    @Get('/profile')
    @UseGuards(AuthGuard('jwt'))
    getMyProfile(@CurrentUser() user:any){
        return this.authservice.GetProfile(user.id)
    }

   
}



