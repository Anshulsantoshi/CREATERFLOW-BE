import {UseInterceptors , Controller, Post, Get, Put, UploadedFile, UseGuards } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express'
import{MediaService} from './media.service'
import {JwtStrategy} from '../auth/jwt.strategy'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '../auth/user.decorator'


@Controller('media')
export class MediaController {

    constructor(
     private readonly mediaservice:MediaService
    ){}


    
@Post('/upload')
  @UseInterceptors(FileInterceptor('file')) // 👈 'file' wo key hai jo frontend bhejega
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
     return this.mediaservice.uploadMedia(file)
  }

@Put('/profile/upload-pic') // Route
@UseGuards(AuthGuard('jwt')) // 🔒 1. Taala lagaya (Login zaroori hai)
@UseInterceptors(FileInterceptor('file')) // 2. 'file' chota hona chahiye (convention)
uploadPfp(
    @UploadedFile() file: Express.Multer.File, // 3. File mili
    @CurrentUser() user: any                   // 4. User ID mili Token se
) {
    // Service ko call karte waqt sahi cheezein bhejo
    // user.userId -> Token se aaya
    // file.filename -> Multer ne banaya
    return this.mediaservice.uploadProfilePic(user.userId, file.filename);
}


}