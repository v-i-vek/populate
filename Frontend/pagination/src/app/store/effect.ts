import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { PaginationService } from '../service/pagination.service';
import { onCallOfPage, onSuccessCallOfPage } from './action';
import { exhaustMap, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class pagination {
  constructor(
    private action$: Actions,
    private pageService: PaginationService
  ) {}

  loadPagination = createEffect(() => {
    console.log('effect is called');

    return this.action$.pipe(
      ofType(onCallOfPage),
      exhaustMap((action:any) => {
        // console.log("inside the map");
        
       console.log(action.data.page);
       
        return this.pageService
          .paginatate(
            action.data.page,
            action.data.pageSize,
            action.data.search
          )
          .pipe(
            map((data: any) => {
              console.log(data.data);

              return onSuccessCallOfPage(data);
            })
          );
      })
    );
  });
}
