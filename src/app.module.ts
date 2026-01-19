import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Folder ka rasta
      serveRoot: '/uploads', // Browser mein URL kaisa dikhega (e.g. localhost:3000/uploads/xyz.jpg)
    }),
    // ✅ .env ko load karta hai
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ TypeORM config .env se read karega
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url:  process.env.DATABASE_URL,

        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },

        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    AuthModule,

    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
