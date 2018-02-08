import React from 'react';
import axios from 'axios';
import { Form, Card, Input, Image, Label } from 'semantic-ui-react';

export default class UserSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      foundUser: {},
      isUserFound: false,
      showWarning: false,
    };
  }

  handleInputChange(e) {
    const username = e.target.value;
    this.setState({ username });

    axios.post('/api/userByUsername', { username })
      .then((user) => {
        if (user.data) {
          this.setState({
            foundUser: user.data,
            isUserFound: true,
          });
        }
      })
      .catch(err => console.log(err));
  }

  addFriend(friendId) {
    this.props.getFriend(friendId);
    axios.post('/api/addFriend', {
      friendId,
      userId: this.props.currentUser.userId,
    })
      .then(() => this.setState({
        username: '',
        foundUser: {},
      }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Card className="user-search-box">
        <Card.Content>
          {this.state.showWarning ? <Label pointing color='red'>You must be signed in to add a friend</Label> : ''}
          <Form>
            <Form.Field>
              <label>Search usernames</label>
              <Input type='text' onChange={this.handleInputChange.bind(this)} value={this.state.username} />
            </Form.Field>
          </Form>
        </Card.Content>
        <Card.Content>
          {this.state.isUserFound ? <div onClick={() => this.addFriend(this.state.foundUser._id)}>
            <Image className="user-search-image" src={this.state.foundUser.profileImage} circular/>
            <span className="user-search-username">{this.state.foundUser.username}</span>
          </div> : ''}
        </Card.Content>
      </Card>
    );
  }
}
