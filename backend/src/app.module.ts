import {ClassSerializerInterceptor, Module, ValidationPipe} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from '@modules/inventory/inventory.module';
import { AuthModule } from '@modules/auth/auth.module';
import {UsersModule} from "@modules/users/users.module";
import { ConfigModule } from '@nestjs/config';
import {APP_FILTER, APP_INTERCEPTOR, APP_PIPE} from "@nestjs/core";
import {ResponseInterceptor} from "@common/interceptors/response.interceptor";
import {ErrorHandlerExceptionFilter} from "@common/exceptions/error-handler-exception.filter";

@Module({
  imports: [ConfigModule.forRoot(), InventoryModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorHandlerExceptionFilter,
    },
  ],
})
export class AppModule {}
