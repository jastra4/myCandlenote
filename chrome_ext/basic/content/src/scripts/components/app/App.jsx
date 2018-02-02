import React, {Component} from 'react';
import '../../../styles/styles.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowState: 'cn-dismiss'
    };
    this.handleWindowClose = this.handleWindowClose.bind(this);
  }

  handleWindowClose () {
    this.state.windowState === 'cn-dismiss'
      ? this.setState({ windowState: 'cn-open' })
      : this.setState({ windowState: 'cn-dismiss' })
  }

  render() {
    console.log('lolooll')
    return (
      <div>
        <div className={`cnwindowopen`} >
        </div>
        <div className={`tabopen` } >
          CandleNote
        </div>
      </div>
    );
  }
}

export default App;
