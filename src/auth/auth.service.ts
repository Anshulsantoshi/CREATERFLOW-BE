import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtservice : JwtService
  ) {}

  async signup(email: string, name: string , password:number ) {

    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) {
      throw new ConflictException('Email already registered');
    }

    const newUser = this.userRepo.create({ email, name , password});
    return await this.userRepo.save(newUser);
  }

  egy
  async login (email:string  , password:number){

    const user  = await this.userRepo.findOne({where:{email}});

    if(!user){
      return "invalid email user do not exist"
    }

    if(user.password!=password){
      return "invalid password"
    }

    const payload = {userId:user.email , Email:user.email}

    return{
      access_token: this.jwtservice.sign(payload)
    }




  }
}
