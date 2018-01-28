import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopBar from './topBar';
import MainPage from './mainPage';
import NotFoundPage from './notFoundPage';
import Notepad from './notePad';
import Notebox from './noteBox';


const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={ true } render={() => <TopBar ContentPage={ MainPage }/>} />
        <Route path='/notepad' render={() => <TopBar ContentPage={ Notepad }/>} />
        <Route path='/notebox' render={() => <TopBar ContentPage={ Notebox }/>} />
        <Route path='/flashcards' render={() => <TopBar ContentPage={ NotFoundPage } />} />
        <Route path='/library' render={() => <TopBar ContentPage={ NotFoundPage } />} />
        <Route path='/studyhall' render={() => <TopBar ContentPage={ NotFoundPage } />} />
        <Route path='/quizzlet' render={() => <TopBar ContentPage={ NotFoundPage } />} />
        <Route render={() => <TopBar ContentPage={ NotFoundPage }/>}/>
      </Switch>
    </BrowserRouter>
  </div>
);


ReactDOM.render(<App />, document.getElementById('app'));
