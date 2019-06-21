import React, { Component } from 'react';

import { RouterButton } from '../components/RouterButton';
import { TravisResponse } from '../interface/TravisResponse';
import { RepoStringParser } from '../service/RepoStringParser';
import { ACCESS_TOKEN_LS_KEY, TRAVIS_REPOS_LS_KEY } from '../config';
import { DashboardDataFetcher } from '../service/DashboardDataFetcher';

interface DashboardState {
  data: any;
}

class Dashboard extends Component<{}, DashboardState> {
  private fetcher: DashboardDataFetcher;

  constructor(props: {}) {
    super(props);

    this.state = {
      data: null,
    };

    const accessKey = localStorage.getItem(ACCESS_TOKEN_LS_KEY) || '';
    const travisRepoString = localStorage.getItem(TRAVIS_REPOS_LS_KEY);
    const repositories = RepoStringParser.parse(travisRepoString || '');

    this.fetcher = new DashboardDataFetcher(accessKey, repositories);
  }

  public componentDidMount(): void {
    this.fetcher.start(this.updateDashboardData);
  }

  public render() {
    return (
      <div>
        Dashboard
        <RouterButton to="/">Back</RouterButton>
        <br />
        <pre>
          {JSON.stringify(this.state.data, null, 2)}
        </pre>
      </div>
    );
  }

  private updateDashboardData = (data: TravisResponse[]) => {
    this.setState({
      data,
    });
  }
}

export { Dashboard };
