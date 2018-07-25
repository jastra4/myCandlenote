import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../src/store/index.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        test
      </div>
    )
  }
}

ReactDOM.render((
  <Provider store={Store} >
    <Main />
  </Provider>
), document.getElementById('root'));
