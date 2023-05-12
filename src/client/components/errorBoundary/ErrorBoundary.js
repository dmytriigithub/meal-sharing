import React, { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <ErrorMessage/>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
