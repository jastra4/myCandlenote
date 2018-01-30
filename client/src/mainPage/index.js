import React from 'react';

export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render = () => (
    <div>
      <h1>Main Page</h1>
      <p>Hello World :)</p>
      <a href="/auth/google">Sign In with Google</a>
    </div>
  );
}
