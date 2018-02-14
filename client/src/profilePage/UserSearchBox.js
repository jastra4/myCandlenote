import React from 'react';
import axios from 'axios';
import { Form, Card, Input, Image, Label, Icon } from 'semantic-ui-react';
import { debounce } from 'lodash';
import MediaQuery from 'react-responsive';

export default class UserSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      foundUser: {},
      isUserFound: false,
      showWarning: false,
    };

    this.findUserByName = debounce(this.findUserByName, 500);
  }

  handleInputChange(e) {
    const username = e.target.value;
    this.setState({ username });

    this.findUserByName(username);
  }

  findUserByName(username) {
    axios.post('/api/userByUsername', { username })
      .then((user) => {
        if (user.data) {
          this.setState({
            foundUser: user.data,
            isUserFound: true,
          });
        } else {
          this.setState({
            foundUser: {},
            isUserFound: false,
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
          <MediaQuery maxWidth={899}>
            <Card.Header as="h4" className="user-friends-header">
              <Icon name="users" /> Friends:
            </Card.Header>
          </MediaQuery>
          <Form>
            <MediaQuery minWidth={900}>
              <Form.Field>
                <label>Search usernames</label>
                <Input type='text' onChange={this.handleInputChange.bind(this)} value={this.state.username} />
              </Form.Field>
            </MediaQuery>
            <MediaQuery maxWidth={899}>
              <Form.Field>
                <Input type='text' onChange={this.handleInputChange.bind(this)} value={this.state.username} placeholder="Search usernames" />
              </Form.Field>
            </MediaQuery>
          </Form>
        </Card.Content>
        <MediaQuery maxWidth={899}>
          <Card.Content className="user-friend-card-count">
            <ul>
              {this.props.friends.map(friend => (
                <li>
                  {friend.username} {console.log('Friend:', friend)}<Icon name="remove" onClick={() => this.props.handleRemoveFriend(friend)} />
                </li>
              ))}
            </ul>
          </Card.Content>
        </MediaQuery>
        {this.state.isUserFound ? <Card.Content className="user-search-result">
          <div onClick={() => this.addFriend(this.state.foundUser._id)}>
            <Image className="user-search-image" src={this.state.foundUser.profileImage} circular/>
            <span className="user-search-username">{this.state.foundUser.username}</span>
          </div>
        </Card.Content> : ''}
      </Card>
    );
  }
}
