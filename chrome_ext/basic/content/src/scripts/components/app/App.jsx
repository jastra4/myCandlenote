import React, {Component} from 'react';
import '../../../styles/styles.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowState: '',
      intermediateAnimation: ''
    };
    this.toggleWindowState = this.toggleWindowState.bind(this);
  }

  toggleWindowState () {
    if (!this.state.windowState) {
      this.setState({ intermediateAnimation: 'cn-intermediate'})
    }
    if (this.state.windowState === 'cn-dismiss' || !this.state.windowState) {
      this.setState({ windowState: 'cn-open' });
    
    } else {
      this.setState({ windowState: 'cn-dismiss' });
    
    }
  }

  render() {
    return (
      <div className={`candlenote-parent `}>
        <div className={`candlenote-window ${this.state.intermediateAnimation} ${this.state.windowState}` } >
        </div>
        <div className={`candlenote-tab`}  onClick={ this.toggleWindowState }>
          CandleNote
        </div>
      </div>
    );
  }
}

export default App;
