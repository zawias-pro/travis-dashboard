import React from 'react';
import { Container, TextField, Typography } from '@material-ui/core';

import { RouterButton } from '../components/RouterButton';
import { ACCESS_TOKEN_LS_KEY, TRAVIS_REPOS_LS_KEY } from '../config';

interface FormState {
  ready: boolean;
  accessTokenValue: string;
  travisReposValue: string;
}

class Form extends React.Component<{}, FormState> {
  public state = {
    ready: false,
    accessTokenValue: '',
    travisReposValue: '',
  };

  public componentDidMount(): void {
    this.setState({
      ready: true,
      accessTokenValue: localStorage.getItem(ACCESS_TOKEN_LS_KEY) || '',
      travisReposValue: localStorage.getItem(TRAVIS_REPOS_LS_KEY) || '',
    });
  }

  public render() {
    const {accessTokenValue, travisReposValue, ready} = this.state;
    const disabled = !ready;

    return (
      <Container maxWidth="xs" component="main">
        <div>
          <Typography component="h1" variant="h2" style={{ marginBottom: 30, textAlign: 'center' }}>
            Travieso
          </Typography>
          <Typography component="h2" variant="h5" style={{ marginBottom: 30, textAlign: 'center' }}>
            Dashboard for Travis CI
          </Typography>
          <form>
            <TextField
              disabled={disabled}
              label="Access token"
              fullWidth
              margin="normal"
              value={accessTokenValue}
              onChange={this.onChange(ACCESS_TOKEN_LS_KEY)}
              type="password"
            />
            <TextField
              disabled={disabled}
              label="Repositories"
              fullWidth
              margin="normal"
              multiline
              value={travisReposValue}
              onChange={this.onChange(TRAVIS_REPOS_LS_KEY)}
            />
            <RouterButton
              disabled={disabled}
              variant="contained"
              color="primary"
              fullWidth
              to="/dashboard"
              style={{ marginTop: 30 }}
            >
              Go to dashboard
            </RouterButton>
          </form>
        </div>
      </Container>
    );
  }

  private onChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (key === ACCESS_TOKEN_LS_KEY) {
      this.setState({
        accessTokenValue: event.target.value,
      });
    } else if (key === TRAVIS_REPOS_LS_KEY) {
      this.setState({
        travisReposValue: event.target.value,
      });
    }

    localStorage.setItem(key, event.target.value);
  }
}

export { Form };
