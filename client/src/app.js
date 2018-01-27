import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import TopBar from './topBar';
import MainPage from './mainPage';
import NotFoundPage from './notFoundPage';
import DeckCreator from './decksPage/DeckCreatorContainer';
import DeckView from './decksPage/DeckViewContainer';
import FlashcardPage from './flashcardsPage';
import FlashcardView from './flashcardsPage/FlashcardViewContainer';
import DeckListVert from './decksPage/DeckListVertContainer';
import { store, persistor } from '../src/store';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} render={() => <TopBar ContentPage={MainPage} />} />
        <Route path='/two' exact={true} render={() => <TopBar ContentPage={PageTwo} />} />
        <Route path='/createFlashcard' exact={true} render={() => <TopBar ContentPage={FlashcardPage} />} />
        <Route path='/createDeck' exact={true} render={() => <TopBar ContentPage={DeckCreator }/>} />
        <Route path='/flashcards' exact={true} render={() => <TopBar ContentPage={FlashcardPage} />} />
        <Route path='/decks' exact={true} render={() => <TopBar ContentPage={DeckView} />} />
        <Route path='/deckList' exact={true} render={() => <TopBar ContentPage={DeckListVert} />} />

        <Route component={ NotFoundPage }></Route>
        <Route render={() => <TopBar ContentPage={ NotFoundPage }/>}/>
      </Switch>
  </BrowserRouter>
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
);
