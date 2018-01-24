import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './mainPage';
import PageTwo from './pageTwo';
import NotFoundPage from './notFoundPage';
import store from './store';
import * as messagesActions from './actions/messagesActions';
import * as flashcardActions from './actions/flashcardsActions';

// const App = () => (
//   <div>
//     <BrowserRouter>
//       <Switch>
//         <Route path='/' component={ MainPage } exact={ true } ></Route>
//         <Route path='/two' component={ PageTwo }></Route>
//         <Route component={ NotFoundPage }></Route>
//       </Switch>
//     </BrowserRouter>
//   </div>
// );

store.dispatch(messagesActions.setMessages([{ id: 3, name: 'travis', age: 25 }, { id: 7, name: 'Jon', age: 50 }]));
store.dispatch(messagesActions.addMessage({ id: 10, name: 'Michie', age: 32 }));
store.dispatch(flashcardActions.addFlashcard({ id: 10, name: 'Michie', age: 32 }));
store.dispatch(flashcardActions.setFlashcards([{ id: 3, name: 'travis', age: 25 }, { id: 7, name: 'Jon', age: 50 }]));
store.dispatch(flashcardActions.setCurrentFlashcard({ id: 10 }));

// ReactDOM.render(<App />, document.getElementById('app'));
