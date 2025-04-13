import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    console.log(`Incoming request: ${request.method} ${request.url}`);

    return next.handle().pipe(
      tap(() =>
        console.log(`Request to ${request.url} completed in ${Date.now() - now}ms`)
      )
    );
  }
}
