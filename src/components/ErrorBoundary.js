import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';

const ErrorDisplay = styled.div`
  width: 80%;
  margin: 20% auto 0;
  p {
    font-size: 1.5em;
  }
`;

export default class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <ErrorDisplay>
          <h1>Dang! Something went wrong. :(</h1>
          <p>The nerds have been notified.</p>
          <p>
            <Button onClick={() => window.location.reload()}>Reload</Button>
          </p>
        </ErrorDisplay>
      );
    }

    return this.props.children;
  }
}
