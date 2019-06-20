import React, { Component } from 'react';

import { RepoStringParser } from '../service/RepoStringParser';
import { ACCESS_TOKEN_LS_KEY, TRAVIS_REPOS_LS_KEY } from '../config';
import { DashboardDataFetcher } from '../service/DashboardDataFetcher';

class Dashboard extends Component {
  private fetcher: DashboardDataFetcher;

  constructor(props: {}) {
    super(props);

    const accessKey = localStorage.getItem(ACCESS_TOKEN_LS_KEY) || '';
    const travisRepoString = localStorage.getItem(TRAVIS_REPOS_LS_KEY);
    const repositories = RepoStringParser.parse(travisRepoString || '');

    this.fetcher = new DashboardDataFetcher(accessKey, repositories);
  }

  public componentDidMount(): void {
    this.fetcher.start(console.log);
  }

  public render() {
    return <div>Dashboard</div>;
  }
}

export { Dashboard };
