import React from 'react';
import { Grid, Image, Segment, Header, Label } from 'semantic-ui-react';
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
    };

    this.dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
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

  handleRemoveFriend(friendId) {
    console.log('Removed Friend:', friendId);
    this.props.removeFriend(friendId);
    axios.post('/api/removeFriend', {
      friendId,
      userId: this.props.id,
    })
      .then(res => console.log('Removed response:', res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Grid columns="equal">
        <Grid.Row>
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
                <UserFriendsList
                  friends={this.state.friends}
                  handleRemoveFriend={this.handleRemoveFriend}
                />
                <UserSearchBox
                  currentUser={this.props.currentUser}
                  getFriend={this.props.getFriend}
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
