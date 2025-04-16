import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        return {
          success: true,
          statusCode: ctx.getResponse()?.statusCode || 200,
          path: request.url,
          message: data?.message || 'Request processed successfully',
          data: data?.data || data,
          error: null as Error | null,
        };
      }),
    );
  }
}