import React, { Component } from 'react';

import { TRAVIS_REPOS_LS_KEY } from '../config';
import { RepoStringParser } from '../service/RepoStringParser';
import { DashboardDataFetcher } from '../service/DashboardDataFetcher';

class Dashboard extends Component {
  private fetcher: DashboardDataFetcher;

  constructor(props: {}) {
    super(props);

    const localStorageEntry = localStorage.getItem(TRAVIS_REPOS_LS_KEY);
    const repositories = RepoStringParser.parse(localStorageEntry || '');

    this.fetcher = new DashboardDataFetcher(repositories);
  }

  public componentDidMount(): void {
    this.fetcher.start(console.log);
  }

  public render() {
    return <div>Dashboard</div>;
  }
}

export { Dashboard };
