import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux'; // auth stuff
import { PersistGate } from 'redux-persist/lib/integration/react';
import axios from 'axios';
import TopBar from './topBar';
import MainPage from './mainPage';
import NotFoundPage from './notFoundPage';
import DeckPage from './decksPage/DeckContainer';
import FlashcardPage from './flashcardsPage/FlashcardContainer';
// import StudyHallContainer from './studyHallPage/StudyHallContainer';
import { store, persistor } from '../src/store';
import { isAuth } from './actions/isAuth'; // auth stuff

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Create connection when page loads if user is authenticated
  componentDidMount() {
    return axios.get('/checkAuth')
      // .then((authStatus, username) => {
        .then((body) => {
        this.props.isAuth(body.data.auth, body.data.userId);
        // this.props.userId()
      });
  }

  render = () =>
    (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact={true} render={() => <TopBar ContentPage={MainPage} />} />
            {/* <Route path='/two' exact={true} render={() => <TopBar ContentPage={PageTwo} />} /> */}
            <Route path='/createFlashcard' exact={true} render={() => <TopBar ContentPage={FlashcardPage} />} />
            <Route path='/flashcards' exact={true} render={() => <TopBar ContentPage={FlashcardPage} />} />
            <Route path='/decks' exact={true} render={() => <TopBar ContentPage={DeckPage} />} />
            <Route path='/studyHall' exact={true} render={() => <TopBar ContentPage={StudyHall} />} />
            <Route component={ NotFoundPage }></Route>
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
