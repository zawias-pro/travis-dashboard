import { from, Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { combineAll, map, catchError, concatMap } from 'rxjs/operators';

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
    const item$ = from(this.repositories);

    const request$ = item$.pipe(
      concatMap(item => this.getResponse(item)),
    );

    const result$ = request$.pipe(
      map(response => of(response)),
      combineAll(),
    );

    result$.subscribe(emit);
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
        'User-Agent': 'Travis dashboard by zawias-pro',
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
