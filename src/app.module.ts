import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_zSVnyQ50evcP@ep-blue-unit-ahkspb31-pooler.c-3.us-east-1.aws.neon.tech/createrflow?sslmode=require&channel_binding=require',

      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },

      autoLoadEntities: true, // ✅ best option (entities auto pick karega)
      synchronize: true, // ✅ dev me ok, prod me false
    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
