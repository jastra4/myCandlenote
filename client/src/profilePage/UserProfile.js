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
          const profileImage = this.resizeProfileImage(res.data.profileImage);
          this.setState({
            ...res.data,
            profileImage,
          }, () => console.log('STATE', this.state));
          this.props.setCurrentUser(res.data);
        })
        .catch(err => console.log(err));
    } else {
      const profileImage = this.resizeProfileImage(this.props.user.profileImage);
      this.setState({
        ...this.props.user,
        profileImage,
      });
    }
  }

  resizeProfileImage(imageUrl) {
    this.state;
    const sizeIndex = imageUrl.indexOf('sz=') + 3;
    const newUrl = `${imageUrl.slice(0, sizeIndex)}300`;
    return newUrl;
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
