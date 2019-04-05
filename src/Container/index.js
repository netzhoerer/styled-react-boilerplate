import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Wrapper from './Component';

const themeSwitch = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.theme = 'default';
    }

    componentDidMount() {
      setTimeout(() => this.theme = 'red', 2000)
    }

    render() {
      return (
        <WrappedComponent
          theme={this.theme}
          {...this.props}
        />
      )
    }
  }
};

export default hot(themeSwitch(Wrapper));
