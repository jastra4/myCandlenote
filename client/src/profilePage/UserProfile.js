import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import axios from 'axios';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userId: '',
      googleId: '',
      profileImage: '',
    };
  }

  componentDidMount() {
    if (this.props.user.userId === '') {
      axios.get('/userProfile')
        .then((res) => {
          console.log('RES DATA:', res.data);
          this.setState({ ...res.data }, () => console.log('STATE', this.state));
          this.props.setCurrentUser(res.data);
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ ...this.props.user });
    }
  }

  render() {
    console.log('USER STATE:', this.state);
    return (
      <Grid columns="equal">
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={10}>
          <Icon name="user" />
          Hello, {this.props.user.username}
          id: {this.props.id}
          <img src={this.state.profileImage}/>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid>
    );
  }
}
