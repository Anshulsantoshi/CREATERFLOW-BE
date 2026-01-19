import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { diskStorage } from 'multer'; 
import { extname } from 'path';       

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 1. Destination: Folder kahan banega?
        destination: './uploads', 
        
        // 2. Filename: File ka naam kya hoga?
        filename: (req, file, callback) => {
          // File ka original naam (e.g., 'resume.pdf') se extension nikalo
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // .pdf ya .jpg nikal lega
          
          // Naya naam: 'file-123456789.pdf'
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          
          callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}