import React, {Component} from 'react';
import '../../../styles/styles.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowState: 'cn-dismiss'
    };
    this.toggleWindowState = this.toggleWindowState.bind(this);
  }

  toggleWindowState () {
    this.state.windowState === 'cn-dismiss'
      ? this.setState({ windowState: 'cn-open' })
      : this.setState({ windowState: 'cn-dismiss' })
  }

  render() {
    return (
      <div>
        <div className={`cnwindowopen`} >
        </div>
        <div className={`tabopen`} onClick={this.toggleWindowState}>
          CandleNote
        </div>
      </div>
    );
  }
}

export default App;
