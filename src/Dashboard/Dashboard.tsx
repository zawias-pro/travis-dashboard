import React from 'react';
import { Grid } from '@material-ui/core';

import { Status } from './components/Status';
import { TravisStatus } from '../interface/TravisStatus';
import { RouterButton } from '../components/RouterButton';
import { RepoStringParser } from '../service/RepoStringParser';
import { ACCESS_TOKEN_LS_KEY, TRAVIS_REPOS_LS_KEY } from '../config';
import { DashboardDataFetcher } from '../service/DashboardDataFetcher';

interface DashboardState {
  statuses: any;
}

class Dashboard extends React.Component<{}, DashboardState> {
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
    const {statuses} = this.state;

    if (!statuses) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <RouterButton to="/">Back</RouterButton>
        <Grid container spacing={5}>
          {statuses.map((status: TravisStatus) => (
            <Grid item key={status.name} xs={4}>
              <Status status={status}/>
            </Grid>
          ))}
        </Grid>
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
