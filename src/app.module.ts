import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
console.log("✅ AUTH MODULE JWT_SECRET =>", process.env.JWT_SECRET);

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
