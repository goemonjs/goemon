import React from 'react';
import { getLogger } from '../utilities/logger';

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
    if (typeof window !== 'undefined') {  // Check wheter this is client side
      let logger = getLogger();
      logger.error(error.message, info.componentStack);
    }
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
