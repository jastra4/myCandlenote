
import React from 'react';
import ReactDOM from 'react-dom';
import Notepad from './notepad';
import MenuBar from './menuBar';
import TopBar from './topBar';
import { Menu } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <div>
    <TopBar />
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
);


// <div>
//   <img src="/assets/CandleNote-Main-Logo.png"></img>
// </div>
// <MenuBar />

// <Notepad />
