import { ajax } from 'rxjs/ajax';
import { from, interval, Observable, of } from 'rxjs';
import { combineAll, map, catchError, concatMap, startWith } from 'rxjs/operators';

import { UPDATE_MINUTES } from '../../config';
import { Repository } from '../../interface/Repository';
import { TravisStatus } from '../../interface/TravisStatus';
import { createStatusFromResponse } from './createStatusFromResponse';

class DashboardDataFetcher {
  private accessToken: string;
  private repositories: Repository[];

  constructor(accessToken: string, repositories: Repository[]) {
    this.accessToken = accessToken;
    this.repositories = repositories;
  }

  public start = (emit: any): void => {
    interval(1000 * 60 * UPDATE_MINUTES)
      .pipe(
        startWith(0),
      )
      .subscribe(() => {
        emit([]);
        this.updateStatuses(emit);
      });
  }

  public updateStatuses = (emit: any): void => {
    from(this.repositories)
      .pipe(
        concatMap(item => this.getResponse(item)),
        map(response => of(response)),
        combineAll(),
      )
      .subscribe(emit);
  }

  private getResponse = (repository: Repository): Observable<TravisStatus> => {
    const isTokenEmpty = this.accessToken === '';

    const serverAddress = isTokenEmpty
      ? 'https://api.travis-ci.org'
      : 'https://api.travis-ci.com';

    const authorizationHeader = isTokenEmpty
      ? {}
      : {'Authorization': `token ${this.accessToken}`};

    return ajax.getJSON(
      `${serverAddress}/repo/${repository.slug}?include=branch.last_build`,
      {
        'Travis-Api-Version': 3,
        ...authorizationHeader,
      },
    ).pipe(
      map(createStatusFromResponse),
      catchError((error: Error) => of({
        name: repository.name,
        error,
      })),
    );
  }
}

export { DashboardDataFetcher };
