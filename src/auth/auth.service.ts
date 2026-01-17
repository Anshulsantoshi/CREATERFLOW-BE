import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async signup(email: string, name: string) {

       // ✅ optional: check already exists
    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) {
      throw new ConflictException('Email already registered');
    }

    const newUser = this.userRepo.create({ email, name });
    return await this.userRepo.save(newUser);
  }
}
