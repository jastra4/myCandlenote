import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

=======
import TopBar from './topBar';
>>>>>>> master
import MainPage from './mainPage';
import NotFoundPage from './notFoundPage';
import DeckCreator from './decksPage/DeckCreatorContainer';
import DeckView from './decksPage/DeckViewContainer';
import FlashcardPage from './flashcardsPage/FlashcardCreatorContainer';
import FlashcardView from './flashcardsPage/FlashcardViewContainer';
import DeckListVert from './decksPage/DeckListVertContainer';
import { store, persistor } from '../src/store';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={ true } render={() => <TopBar ContentPage={ MainPage }/>} />
        <Route path='/two' component={ PageTwo }></Route>
        <Route path='/createFlashcard' component={ FlashcardPage }></Route>
        <Route path='/createDeck' component={DeckCreator}></Route>
        <Route path='/flashcards' component={FlashcardView}></Route>
        <Route path='/decks' component={DeckView}></Route>
        <Route path='/deckList' component= { DeckListVert }></Route>

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
