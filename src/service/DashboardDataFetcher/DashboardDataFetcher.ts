import { from, Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { combineAll, delay, map, mergeMap, catchError } from 'rxjs/operators';

import { Repository } from '../../interface/Repository';

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
      mergeMap(item => this.getResponse(item)),
    );

    const result$ = request$.pipe(
      map(response => of(response)),
      combineAll(),
    );

    result$.subscribe(emit);
  }

  private getMockResponse = (item: Repository) => {
    return of('this is travis response for' + item.name)
      .pipe(
          delay(Math.random() * 3000),
      );
  }

  private getResponse = (repository: Repository): Observable<any> => {
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
      map((response: any) => ({
        name: response.name,
        fullName: response.slug,
        description: response.description,
        language: response.github_language,
        branch: response.default_branch.name,
        build: {
          state: response.default_branch.last_build.state,
          previousState: response.default_branch.last_build.previous_state,
          commit: response.default_branch.last_build.commit.message,
          startedAt: response.default_branch.last_build.started_at,
          finishedAt: response.default_branch.last_build.finished_at,
          author: response.default_branch.last_build.created_by.login,
        },
      })),
      // @ts-ignore
      catchError(error => {
        return of('error');
      }),
    );
  }
}

export { DashboardDataFetcher };
