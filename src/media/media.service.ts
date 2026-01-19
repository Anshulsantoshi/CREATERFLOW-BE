import { Injectable, BadRequestException } from '@nestjs/common';
import {InjectRepository } from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {User} from '../auth/entities/user.entity'
import {JwtStrategy} from '../auth/jwt.strategy'

@Injectable()
export class MediaService {


  constructor(
    @InjectRepository(User)
    private readonly userrepo : Repository<User>,
    private jwtstrategy : JwtStrategy
  ){}

  async uploadMedia(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File not received');
    }

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'audio/mpeg',  // mp3
      'audio/mp3',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'File format incorrect. Only PDF, Images (jpeg/png/webp) or MP3 allowed.',
      );
    }

    return {
      message: 'File is being uploaded ✅',
      fileName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

// auth.service.ts

async uploadProfilePic(userId: number, filename: string) {
    // 1. Pehle check karne ki zaroorat nahi hai, update seedha try kar sakte hain
    // Lekin agar check karna hai toh 'profilePic' column name sahi hona chahiye
    
    // NOTE: Column ka naam 'profilePic' hai (jo entity mein banaya tha)
    await this.userrepo.update(userId, { profilePic: filename });

    return {
        message: "Profile Picture Updated! 📸",
        url: `http://localhost:3000/uploads/${filename}` // Frontend ko URL bana ke de diya
    };
  }}
