import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

export default class UserProfile {
  constructor(props) {
    this.state = { ...props };
  }

  render() {
    return (
      <div>
        Hello, {this.props.user.username}
      </div>
    );
  }
}
