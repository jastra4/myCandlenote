import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux'; // auth stuff
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
import PDF from './notesPage/invisibleEditor';
import store from '../src/store';
import StudyHallConnected from './studyHallPage/StudyHall';
import activeSocket from './actions/activeSocket'; // auth stuff

const socketUrl = 'http://localhost:3000';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/userid') // get user id
      .then((res) => {
        const userid = res.data.userid;
        const socket = io(socketUrl); // create connection
        socket.on('connect', () => {
          axios.get(`/username?id=${userid}`) // add user id to connection
            .then((username) => {
              socket.emit('new user', username);
            });
        });
      });
  }

  render = () =>
    (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact={ true } render={() => <TopBar ContentPage={ MainPage }/>} />
            <Route path='/notepad' render={() => <TopBar ContentPage={ Notes }/>} />
            <Route path='/notebox' render={() => <TopBar ContentPage={ Notebox }/>} />
            <Route path='/flashcards' exact={true} render={() => <TopBar ContentPage={FlashcardPage} />} />
            <Route path='/createFlashcard' exact={true} render={() => <TopBar ContentPage={FlashcardPage} />} />
            <Route path='/decks' exact={true} render={() => <TopBar ContentPage={DeckPage} />} />
            <Route path='/library' render={() => <TopBar ContentPage={ NotFoundPage } />} />
            <Route path='/studyhall' render={() => <TopBar ContentPage={ StudyHallConnected } />} />
            <Route path='/quizzlet' render={() => <TopBar ContentPage={ NotFoundPage } />} />
            <Route path='/PDF' render={props => <PDF {...props} />} />
            <Route render={() => <TopBar ContentPage={ NotFoundPage }/>}/>
            <Route path='/login' render={() => (<a href="/auth/google">Sign In with Google</a>)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
}

const mapDispatchToProps = dispatch => (
  { activeSocket: (socket) => dispatch(activeSocket(socket)) }
);

const AppConnected = connect(null, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <AppConnected />
    {/* </PersistGate> */ }
  </Provider>,
  document.getElementById('app'),
);
