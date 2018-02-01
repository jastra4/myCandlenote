import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux'; // auth stuff
import axios from 'axios';
import { PersistGate } from 'redux-persist/lib/integration/react';
import TopBar from './topBar';
import MainPage from './mainPage';
import NotFoundPage from './notFoundPage';
import Notes from './notesPage'; // eslint-disable-line 
import Notebox from './noteBox';
import DeckPage from './decksPage/DeckContainer';
import FlashcardPage from './flashcardsPage/FlashcardContainer';
import UserProfile from './profilePage';
import PDF from './notesPage/invisibleEditor';
import { store, persistor } from '../src/store';
import StudyHallConnected from './studyHallPage/StudyHall';
import isAuth from './actions/isAuth'; // auth stuff

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Create connection when page loads if user is authenticated
  componentDidMount() {
    return axios.get('/checkAuth')
      .then((body) => {
        this.props.isAuth(body.data.auth, body.data.userId);
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
            <Route path='/quizzlet' render={() => <TopBar ContentPage={NotFoundPage} />} />
            <Route path='/profile' render={() => <TopBar ContentPage={ UserProfile } />} />
            <Route path='/PDF' render={props => <PDF {...props} />} />
            <Route render={() => <TopBar ContentPage={ NotFoundPage }/>}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
}

const mapDispatchToProps = dispatch => (
  { isAuth: (authStatus, userId) => dispatch(isAuth(authStatus, userId)) }
);

const AppConnected = connect(null, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppConnected />
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
);
