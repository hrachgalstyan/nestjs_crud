import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

type ResponseMessage = {
  message: string | string[];
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse() as ResponseMessage;

    if (exception instanceof BadRequestException) {
      if (typeof message.message === 'object') {
        return response.status(status).json({
          message: message.message?.[0],
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      }
    }

    response.status(status).json({
      message: message?.message || 'Server Error',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
