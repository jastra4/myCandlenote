import React from 'react';
import { Grid, Image, Segment, Header, Label, Modal, Button, Icon } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import axios from 'axios';
import '../../dist/assets/profilePage.css';
import UserData from './UserData';
import UserFriendsList from './UserFriendsList';
import UserSearchBox from './UserSearchBox';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profileImage: '',
      deckCount: 0,
      flashcardCount: 0,
      dateJoined: '',
      friends: [],
      showWarning: false,
      friendToRemove: {},
    };

    this.dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    this.handleVideoConferenceInviteClick = this.handleVideoConferenceInviteClick.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser.userId === '') {
      axios.get('/userProfile')
        .then((res) => {
          const { username, friends, userId } = res.data;
          this.props.getFriends(userId);
          const profileImage = this.resizeProfileImage(res.data.profileImage);
          const dateJoined = new Date(res.data.dateJoined).toLocaleDateString('en-US', this.dateOptions);
          this.setState({
            username,
            profileImage,
            dateJoined,
            friends,
          });
          this.props.setCurrentUser(res.data);
          this.getDecksAndFlashcards(res.data.userId);
        })
        .catch(err => console.log(err));
    } else {
      this.props.getFriends(this.props.currentUser.userId);
      this.getDecksAndFlashcards(this.props.currentUser.userId);
      const profileImage = this.resizeProfileImage(this.props.currentUser.profileImage);
      this.setState({
        username: this.props.currentUser.username,
        profileImage,
        dateJoined: this.props.id,
      });
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      friends: newProps.currentUser.friends,
    });
  }

  getDecksAndFlashcards(userId) {
    axios.post('/api/userDecks', { userId })
      .then((res) => {
        this.props.setDecks(res.data);
        this.setState({ deckCount: res.data.length });
        return axios.post('/api/userFlashcards', { userId });
      })
      .then((res) => {
        this.props.setFlashcards(res.data);
        this.setState({ flashcardCount: res.data.length });
      })
      .catch(err => console.log(err));
  }

  resizeProfileImage(imageUrl) {
    this.state;
    const sizeIndex = imageUrl.indexOf('sz=') + 3;
    const newUrl = `${imageUrl.slice(0, sizeIndex)}300`;
    return newUrl;
  }

  handleRemoveFriend(friend) {
    this.setState({
      showWarning: true,
      friendToRemove: friend,
    });
  }


  removeFriendById(friendId) {
    this.props.removeFriend(friendId);
    axios.post('/api/removeFriend', {
      friendId,
      userId: this.props.id,
    })
      .then(() => this.setState({
        showWarning: false,
        friendToRemove: {},
      }))
      .catch(err => console.log(err));
  }

  handleVideoConferenceInviteClick() { // eslint-disable-line
    console.log('On the user profile page!!');
  }

  render() {
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Modal open={this.state.showWarning} >
            <Modal.Header as="h1">
              Remove friend from friends list
            </Modal.Header>
            <Modal.Content as="p">
              Are you sure you want to remove
               {this.state.friendToRemove.username} from your friends list?
            </Modal.Content>
            <Modal.Actions>
              <Button
                color='red'
                onClick={() => this.setState({
                  showWarning: false,
                  friendToRemove: {},
                })}
              >
                <Icon name='remove' /> No
              </Button>
              <Button color='green' onClick={() => this.removeFriendById(this.state.friendToRemove.id)}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
          <Grid.Column>
            <div style={{ height: '30px' }}></div>
            <div className="user-info-container">
              <Segment>
                <Label attached="top left">Joined on {this.state.dateJoined}</Label>
                <div className="user-info">
                  <Image src={this.state.profileImage} circular centered />
                  <Header as="h1" textAlign="center">{this.state.username}</Header>
                </div>
                <div className="user-data-fbox">
                  <div>
                    <UserData
                      deckCount={this.state.deckCount}
                      flashcardCount={this.state.flashcardCount}
                      dateJoined={this.state.dateJoined}
                    />
                  </div>
                </div>
              </Segment>
            </div>
            <MediaQuery maxWidth={899}>
              <div className="friends-list-container-squished">
                {/* <UserFriendsList
                  friends={this.state.friends}
                  handleRemoveFriend={this.handleRemoveFriend}
                /> */}
                <UserSearchBox
                  currentUser={this.props.currentUser}
                  getFriend={this.props.getFriend}
                  friends={this.state.friends}
                  handleRemoveFriend={this.handleRemoveFriend}
                />
              </div>
            </MediaQuery>
          </Grid.Column>
          <MediaQuery minWidth={900}>
            <Grid.Column width={4}>
              <div className="friends-list-container">
                <UserFriendsList
                  friends={this.state.friends}
                  handleRemoveFriend={this.handleRemoveFriend}
                />
              </div>
              <UserSearchBox
                currentUser={this.props.currentUser}
                getFriend={this.props.getFriend}
                friends={this.state.friends}
                handleRemoveFriend={this.handleRemoveFriend}
              />
            </Grid.Column>
          </MediaQuery>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
      </Grid>
    );
  }
}
