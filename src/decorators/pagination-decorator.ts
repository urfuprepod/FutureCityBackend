import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Pagination } from 'src/shared/types';

export const GetPagination = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();

    const paginationParams: Pagination = {
      page: 1,
      limit: 10,
    };

    paginationParams.page = req.query.page
      ? parseInt(req.query.page.toString())
      : 1;
    paginationParams.limit = req.query.limit
      ? parseInt(req.query.limit.toString())
      : 10;

    // create array of search
    if (req.query.search) {
      const searchArray = req.query.search.toString().toLowerCase();
      paginationParams.search = searchArray;
    }

    return paginationParams;
  },
);
