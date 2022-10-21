import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { ProductCreatorError } from '../../../core/shared/error/ProductCreatorError';


@Catch(ProductCreatorError)
export class ProductCreatorFilter implements ExceptionFilter {

    catch(exception: ProductCreatorError, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>()

        Logger.error(`ProductController (${request.method}) at {${request.path}} error: ${exception.message}`)

        response
            .status(HttpStatus.BAD_REQUEST)
            .json({
                status: HttpStatus.BAD_REQUEST,
                message: exception.message
            });

    }

}
