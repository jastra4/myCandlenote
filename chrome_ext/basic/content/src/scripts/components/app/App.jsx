import React, {Component} from 'react';
import '../../../styles/styles.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowState: '',
      windowState2: ''

    };
    this.toggleWindowState = this.toggleWindowState.bind(this);
  }

  toggleWindowState () {
    console.log('this.state.windowState: ', this.state.windowState);
    if (this.state.windowState === 'cn-dismiss' || !this.state.windowState) {
      this.setState({ windowState2: 'cn-open' });
      setTimeout(() => {
        this.setState({ windowState: 'cn-open' });
      })
    } else {
      this.setState({ windowState2: 'cn-dismiss' });
      setTimeout(() => {
        this.setState({ windowState: 'cn-dismiss' });
      })
    }
  }

  render() {
    console.log('currentState: ', this.state);
    return (
      <div className={`candlenote-parent `}>
        <div className={`candlenote-window ${this.state.windowState} ${this.state.windowState2}` } >
        </div>
        <div className={`candlenote-tab`}  onClick={ this.toggleWindowState }>
          CandleNote
        </div>
      </div>
    );
  }
}

export default App;
