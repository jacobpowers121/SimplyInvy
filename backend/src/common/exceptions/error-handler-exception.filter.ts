import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";


@Catch()
export class ErrorHandlerExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    response.status(status).json({
      success: false,
      data: null,
      statusCode: status,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}