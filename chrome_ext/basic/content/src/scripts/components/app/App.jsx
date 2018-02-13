import React, {Component} from 'react';
import Editor from '../editor';
import '../../../styles/styles.css'

const inputStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '25px',
  fontWeight: '100',
  width: '500px',
  height: '30px',
  paddingNottom: '10px',
  paddingLeft: '20px',
  paddingTop: '15px',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowState: '',
      intermediateAnimation: '',
      tabState: ''
    };
    this.toggleWindowState = this.toggleWindowState.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress (e) {
    if (e.metaKey && e.keyCode === 77) {
      e.preventDefault();
      this.toggleWindowState();
    };
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

  
  render(){
    return (
      <div className={`candlenote-parent `}>
        <div className={`candlenote-window ${this.state.intermediateAnimation} ${this.state.windowState}` } >
          <Editor />
          <input className='titleInputCE' placeholder='Untitled'/>
        </div>
        <div className={`candlenote-tab  ${this.state.tabState}`}  onClick={ this.toggleWindowState }>
          CandleNote
        </div>
      </div>
    );
  }
}

export default App;
