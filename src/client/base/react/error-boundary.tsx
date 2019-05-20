import React from 'react';
import { logger } from '../utilities/logger';

interface IState {
  hasError: boolean;
  errorMessage: string;
  errorInfo: string;
}

export class ErrorBoundary extends React.Component<{}, IState>  {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      errorInfo: ''
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      errorMessage: error.message,
      errorInfo: info.componentStack
    });
    // You can also log the error to an error reporting service
    logger.error(error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Application Error
        </div>
      );
    }
    return this.props.children;
  }
}
