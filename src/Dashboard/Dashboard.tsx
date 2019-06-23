import React from 'react';
import { Container, Grid, CircularProgress } from '@material-ui/core';

import { getCardColor } from './getCardColor';
import { StatusCard } from './components/StatusCard';
import { TravisStatus } from '../interface/TravisStatus';
import { ErrorStatusCard } from './components/ErrorStatusCard';
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
      statuses: [],
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

    if (statuses.length === 0) {
      return (
        <CircularProgress
          size={100}
          style={{margin: 'calc(50vh - 150px) calc(50vw - 50px) 0'}}
        />
      );
    }

    return (
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {statuses.map((status: TravisStatus) => {
            const commonStyles = {
              backgroundColor: getCardColor(status),
              padding: 8,
              overflow: 'hidden',
            };

            return (
              <Grid item key={status.name} xs={12} md={6} xl={4}>
                {status.error ? (
                  <ErrorStatusCard status={status} styles={commonStyles}/>
                ) : (
                  <StatusCard status={status} styles={commonStyles}/>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }

  private updateDashboardData = (statuses: TravisStatus[]) => {
    this.setState({
      statuses: statuses.map(status => ({
        ...status,
        name: status.name.split('/')[1],
      })),
    });
  }
}

export { Dashboard };
