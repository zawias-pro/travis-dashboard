import React, { Component } from 'react';

import { RouterButton } from '../components/RouterButton';
import { TravisStatus } from '../interface/TravisStatus';
import { RepoStringParser } from '../service/RepoStringParser';
import { ACCESS_TOKEN_LS_KEY, TRAVIS_REPOS_LS_KEY } from '../config';
import { DashboardDataFetcher } from '../service/DashboardDataFetcher';

interface DashboardState {
  statuses: any;
}

class Dashboard extends Component<{}, DashboardState> {
  private fetcher: DashboardDataFetcher;

  constructor(props: {}) {
    super(props);

    this.state = {
      statuses: null,
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
    const { statuses } = this.state;

    if (!statuses) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        Dashboard
        <RouterButton to="/">Back</RouterButton>
        <br />
        {/*<pre>*/}
        {/*  {JSON.stringify(this.state.statuses, null, 2)}*/}
        {/*</pre>*/}
        {statuses.map((status: TravisStatus) => (
          <div>
            {status.name}
          </div>
        ))}
      </div>
    );
  }

  private updateDashboardData = (statuses: TravisStatus[]) => {
    this.setState({
      statuses,
    });
  }
}

export { Dashboard };
