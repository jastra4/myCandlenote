import React, {Component} from 'react';
import '../../../styles/styles.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowState: '',
      intermediateAnimation: '',
      tabState: ''
    };
    this.toggleWindowState = this.toggleWindowState.bind(this);
  }

  toggleWindowState () {
    if (!this.state.windowState) {
      this.setState({ intermediateAnimation: 'cn-intermediate'})
    }
    if (this.state.windowState === 'cn-dismiss' || !this.state.windowState) {
      this.setState({ 
        windowState: 'cn-open',
        tabState: 'cn-tab-open'
      });
    
    } else {
      this.setState({ 
        windowState: 'cn-dismiss',
        tabState: 'cn-tab-dismiss'
      });
    }
  }

  render() {
    return (
      <div className={`candlenote-parent `}>
        <div className={`candlenote-window ${this.state.intermediateAnimation} ${this.state.windowState}` } >
        </div>
        <div className={`candlenote-tab  ${this.state.tabState}`}  onClick={ this.toggleWindowState }>
          CandleNote
        </div>
      </div>
    );
  }
}

export default App;
