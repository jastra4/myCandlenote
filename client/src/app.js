import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import TopBar from './topBar';
import MainPage from './mainPage';
import NotFoundPage from './notFoundPage';
import Notepad from './notePad';
import Notebox from './noteBox';
import DeckPage from './decksPage/DeckContainer';
import FlashcardPage from './flashcardsPage/FlashcardContainer';
import store from '../src/store';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={ true } render={() => <TopBar ContentPage={ MainPage }/>} />
        <Route path='/notepad' render={() => <TopBar ContentPage={ Notepad }/>} />
        <Route path='/notebox' render={() => <TopBar ContentPage={ Notebox }/>} />
        <Route path='/flashcards' exact={true} render={() => <TopBar ContentPage={FlashcardPage} />} />
        <Route path='/createFlashcard' exact={true} render={() => <TopBar ContentPage={FlashcardPage} />} />
        <Route path='/decks' exact={true} render={() => <TopBar ContentPage={DeckPage} />} />
        <Route path='/library' render={() => <TopBar ContentPage={ NotFoundPage } />} />
        <Route path='/studyhall' render={() => <TopBar ContentPage={ NotFoundPage } />} />
        <Route path='/quizzlet' render={() => <TopBar ContentPage={ NotFoundPage } />} />
        <Route path='/' exact={true} render={() => <TopBar ContentPage={MainPage} />} />
        <Route render={() => <TopBar ContentPage={ NotFoundPage }/>}/>
      </Switch>
    </BrowserRouter>
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('app'),
);
