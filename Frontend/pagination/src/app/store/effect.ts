import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PaginationService } from '../service/pagination.service';
import { onCallOfPage, onSuccessCallOfPage } from './selector';
import { exhaustMap } from 'rxjs';

export class pagination {
  constructor(
    private action$: Actions,
    private pageService: PaginationService
  ) {}

  loadPagination = createEffect(() =>
    this.action$.pipe(
      ofType(onCallOfPage),
      exhaustMap(() =>
        this.pageService.paginatate(page, limit, search).pipe(
          map((data) => {
            return onSuccessCallOfPage(data);
          })
        )
      )
    )
  );
}
