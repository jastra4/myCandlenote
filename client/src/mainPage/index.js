import React from 'react';
import Chat from './Chat.js';

export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render = () => (
    <div>
      <h1>Main Page</h1>
      <p>Hello World :)</p>
      <Chat />
      <a href="/auth/google">Sign In with Google</a>
    </div>
  );
}
