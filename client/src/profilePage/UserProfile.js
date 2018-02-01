import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import axios from 'axios';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.state;
    axios.get('/userProfile')
      .then((res) => {
        console.log('RES DATA:', res.data);
        this.setState({ user: res.data });
      })
      .catch(err => console.log(err));
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
