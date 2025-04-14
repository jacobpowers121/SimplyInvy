import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './modules/inventory/inventory.module';
import { AuthModule } from './modules/auth/auth.module';
import {UsersModule} from "./modules/users/users.module";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), InventoryModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
