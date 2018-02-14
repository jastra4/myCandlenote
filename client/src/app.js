import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import Peer from 'peerjs';
// import { PersistGate } from 'redux-persist/lib/integration/react';

// Containers
import NotePageConnected from './notesPage/notesContainer'; // eslint-disable-line 
import DeckPageConnected from './decksPage/DeckContainer';
import FlashcardPageConnected from './flashcardsPage/FlashcardContainer';
import StudyHallConnected from './studyHallPage/StudyHall';
import NoteboxConnected from './noteBox/noteBoxContainer';

// Components
import TopBar from './topBar';
import MainPage from './mainPage';
import NotFoundPage from './notFoundPage';
import UserProfile from './profilePage';
import PDF from './notesPage/invisibleEditor';
import SchedulePage from './schedulePage';
import store from '../src/store';
import VideoConference from './studyHallPage/VideoConference';
import activeSocket from './actions/activeSocket';
import passPeer from './actions/passPeer';
import SimonSays from './SimonSays';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { peer: new Peer({ key: 'o8jk92ig9tdwjyvi' }) };
  }

  componentDidMount() {
    axios.get('/identifyUser')
      .then((res) => {
        if (res.data.username !== undefined) {
          this.initSocket(res.data.username);
          this.props.peer(this.state.peer);
        }
      });
    console.log('Peer object: ', this.state.peer);
  }

  initSocket(username) {
    const socket = io('/');
    socket.on('connect', () => {
      axios.post('/assignUsername', {
        username,
        id: socket.id,
      })
        .then(() => {
          console.log(`Connected ${username} / ${socket.id}!`);
          socket.emit('sign on', { username });
          this.props.activeSocket(socket, username);
        });
    });
  }

  // nameSocket(socket, userid) {
  //   axios.get(`/identifySocket?id=${userid}`)
  //     .then((res) => {
  //       socket.emit('away', res.data);
  //       this.props.activeSocket(socket, res.data);
  //     });
  // }

  render = () =>
    (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact={true} component={MainPage} />
            <Route path='/notepad' render={() => <TopBar ContentPage={ NotePageConnected }/>} />
            <Route path='/notebox' render={() => <TopBar ContentPage={ NoteboxConnected }/>} />
            <Route path='/flashcards' exact={true} render={() => <TopBar ContentPage={FlashcardPageConnected} />} />
            <Route path='/createFlashcard' exact={true} render={() => <TopBar ContentPage={FlashcardPageConnected} />} />
            <Route path='/decks' exact={true} render={() => <TopBar ContentPage={DeckPageConnected} />} />
            <Route path='/library' render={() => <TopBar ContentPage={ NotFoundPage } />} />
            <Route path='/studyhall' render={() => <TopBar ContentPage={ StudyHallConnected } />} />
            <Route path='/quizzlet' render={() => <TopBar ContentPage={NotFoundPage} />} />
            <Route path='/profile' render={() => <TopBar ContentPage={UserProfile} />} />
            <Route path='/schedule' render={() => <TopBar ContentPage={SchedulePage} />} />
            <Route path='/video-conference' render={() => <TopBar ContentPage={VideoConference} />} />
            <Route path='/simonSays' render={() => <TopBar ContentPage={SimonSays} />} />
            <Route path='/PDF' render={props => <PDF {...props} />} />
            <Route render={() => <TopBar ContentPage={ NotFoundPage }/>}/>
            <Route path='/login' render={() => (<a href="/auth/google">Sign In with Google</a>)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
}

const mapDispatchToProps = dispatch => (
  {
    activeSocket: (socket, username) => dispatch(activeSocket(socket, username)),
    peer: peerObject => dispatch(passPeer(peerObject)),
  }
);

const AppConnected = connect(null, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <AppConnected />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('app'),
);
