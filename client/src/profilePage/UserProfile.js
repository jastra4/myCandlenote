import React from 'react';
import { Grid, Icon, Image, Segment, Header, Label } from 'semantic-ui-react';
import axios from 'axios';
import '../../dist/assets/profilePage.css';
import UserData from './UserData';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profileImage: '',
      deckCount: 0,
      flashcardCount: 0,
      dateJoined: '',
    };

    this.dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  }

  componentDidMount() {
    if (this.props.currentUser.userId === '') {
      axios.get('/userProfile')
        .then((res) => {
          console.log('USER PROFILE:', res.data);
          const { username } = res.data;
          const profileImage = this.resizeProfileImage(res.data.profileImage);
          const dateJoined = new Date(res.data.dateJoined).toLocaleDateString('en-US', this.dateOptions);
          this.setState({
            username,
            profileImage,
            dateJoined,
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

  getDecksAndFlashcards(userId) {
    axios.post('/api/userDecks', { userId })
      .then((res) => {
        console.log('Decks in front end:', res.data);
        this.props.setDecks(res.data);
        this.setState({ deckCount: res.data.length });
        return axios.post('/api/userFlashcards', { userId });
      })
      .then((res) => {
        console.log('Flashcards in front end:', res.data);
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

  render() {
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column width={12}>
            <div style={{ height: '30px' }}></div>
            <div className="user-info-container">
              <Segment>
                <Label attached="bottom right">Joined on {this.state.dateJoined}</Label>
                <div className="user-info">
                  <Image src={this.state.profileImage} circular centered />
                  <Header as="h1" textAlign="center">{this.state.username}</Header>
                  <Header textAlign="center">A subheader</Header>
                </div>
              </Segment>
            </div>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <UserData
            deckCount={this.state.deckCount}
            flashcardCount={this.state.flashcardCount}
            dateJoined={this.state.dateJoined}
          />
        </Grid.Row>
      </Grid>
    );
  }
}
