import { Repository } from '../../interface/Repository';

class DashboardDataFetcher {
  private repositories: Repository[];

  constructor(repositories: Repository[]) {
    this.repositories = repositories;
  }

  public start(emit: any): void {
    setInterval(() => emit('update'), 2000);
  }
}

export { DashboardDataFetcher };
