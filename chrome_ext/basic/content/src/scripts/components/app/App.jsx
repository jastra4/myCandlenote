import React, {Component} from 'react';
// import '_' from 'lodash';
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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    // this.debouncedHandleEditorChange = _.debounce(this.handleEditorChange, 1000);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress)
    const noteInfo = window.localStorage.getItem('noteInfo');
    this.setState({ ...noteInfo });
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

  handleInputChange (e) {
    const title = e.target.value;
    this.setState({ title });
  }

  updateNoteInfo () {
    const { title, body, authorID } = this.state;
    const noteInfo = {
      title,
      body, 
      authorID,
    };
    window.localStorage.setItem({ noteInfo });
  }

  handleEditorChange (packet) {
    const noteInfo = {
      title: this.state.title || 'Untitled',
      body: packet,
    }

    chrome.runtime.sendMessage({
      action: 'updateNote',
      payload: noteInfo,
    });

    window.localStorage.setItem('noteInfo', noteInfo);
  }
  
  render(){
    return (
      <div className={`candlenote-parent `}>
        <div className={`candlenote-window ${this.state.intermediateAnimation} ${this.state.windowState}` } >
          <Editor 
            // handleEditorChange={ this.handleEditorChange } 
            // body={ this.state.body }
          />
          <input onChange={ this.handleInputChange } className='titleInputCE' placeholder='Untitled'/>
        </div>
        <div className={`candlenote-tab  ${this.state.tabState}`}  onClick={ this.toggleWindowState }>
          CandleNote
        </div>
      </div>
    );
  }
}

export default App;
