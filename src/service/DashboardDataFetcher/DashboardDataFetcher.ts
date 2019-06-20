import { from, of } from 'rxjs';
import { combineAll, delay, map, mergeMap } from 'rxjs/operators';

import { Repository } from '../../interface/Repository';
import { ajax } from "rxjs/ajax";

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

  private getResponse = (repository: Repository) => {
    return ajax.getJSON(
      `https://api.travis-ci.com/repo/${repository.slug}?include=default_branch.last_build`,
      {
        'Travis-Api-Version': 3,
        'User-Agent': 'Travis dashboard by zawias-pro',
        'Authorization': `token ${this.accessToken}`,
      },
    );
  }
}

export { DashboardDataFetcher };
