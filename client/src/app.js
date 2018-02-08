import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import TopBar from './topBar';
import MainPage from './mainPage';
import NotFoundPage from './notFoundPage';
import Notes from './notesPage'; // eslint-disable-line 
import Notebox from './noteBox';
import DeckPage from './decksPage/DeckContainer';
import FlashcardPage from './flashcardsPage/FlashcardContainer';
import UserProfile from './profilePage';
import PDF from './notesPage/invisibleEditor';
import SchedulePage from './schedulePage';
import store from '../src/store';
import StudyHallConnected from './studyHallPage/StudyHall';
import activeSocket from './actions/activeSocket';


const socketUrl = 'http://localhost:3000';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.identifyUser();
  }

  identifyUser() {
    axios.get('/api/userid')
      .then((res) => {
        if (res.data.userid !== undefined) {
          this.initSocket(res.data.userid);
        } else {
          console.log('Not logged in');
        }
      });
  }

  initSocket(userid) {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      this.nameSocket(socket, userid);
    });
  }

  nameSocket(socket, userid) {
    axios.get(`/identifySocket?id=${userid}`)
      .then((res) => {
        socket.emit('away', res.data);
        this.props.activeSocket(socket, res.data);
        console.log(`${res.data} connected!`);
      });
  }

  render = () =>
    (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact={ true } component={ MainPage }/>
            <Route path='/notepad' render={() => <TopBar ContentPage={ Notes }/>} />
            <Route path='/notebox' render={() => <TopBar ContentPage={ Notebox }/>} />
            <Route path='/flashcards' exact={true} render={() => <TopBar ContentPage={FlashcardPage} />} />
            <Route path='/createFlashcard' exact={true} render={() => <TopBar ContentPage={FlashcardPage} />} />
            <Route path='/decks' exact={true} render={() => <TopBar ContentPage={DeckPage} />} />
            <Route path='/library' render={() => <TopBar ContentPage={ NotFoundPage } />} />
            <Route path='/studyhall' render={() => <TopBar ContentPage={ StudyHallConnected } />} />
            <Route path='/quizzlet' render={() => <TopBar ContentPage={NotFoundPage} />} />
            <Route path='/profile' render={() => <TopBar ContentPage={UserProfile} />} />
            <Route path='/schedule' render={() => <TopBar ContentPage={SchedulePage} />} />
            <Route path='/PDF' render={props => <PDF {...props} />} />
            <Route render={() => <TopBar ContentPage={ NotFoundPage }/>}/>
            <Route path='/login' render={() => (<a href="/auth/google">Sign In with Google</a>)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
}

const mapDispatchToProps = dispatch => (
  { activeSocket: (socket, username) => dispatch(activeSocket(socket, username)) }
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
