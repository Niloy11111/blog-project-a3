/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleCastError from '../errors/handleCastError';

import { AppError } from '../errors/AppError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TError } from '../interface/error';

const globalErrorHanler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong';

  let error: TError = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  }
  // this makes a difference which is it set the message of error orginally
  else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode: statusCode,
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
export default globalErrorHanler;