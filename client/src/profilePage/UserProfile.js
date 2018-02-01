import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid>
        <Icon name="user" />
        Hello, {this.props.user.username}
        id: {this.props.id}
      </Grid>
    );
  }
}
