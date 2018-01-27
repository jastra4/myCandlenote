import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopBar from './topBar';
import MainPage from './mainPage';
import NotFoundPage from './notFoundPage';
import Notepad from './notepad';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={ true } render={() => <TopBar ContentPage={ MainPage }/>} />
        <Route path='/notepad' exact={ true } render={() => <TopBar ContentPage={ Notepad }/>} />
        <Route render={() => <TopBar ContentPage={ NotFoundPage }/>}/>
      </Switch>
  </BrowserRouter>
  </div>
);


ReactDOM.render(<App />, document.getElementById('app'));
