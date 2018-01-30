import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';

export default class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentWillMount() {
    const { location: { pathname } } = this.props;
    const fileName = pathname.split('/').pop();
    fileName && axios.post('/api/getEditorPacket', { fileName })
      .then(({ data: { data: packet } }) => {
        const value = JSON.parse(packet);
        this.setState({ value });
      })
      .catch(e => console.error(e));
  }

  componentDidMount() {
    setTimeout(() => {
      console.log('loaded!');
      window.callPhantom('takeShot');
    }, 500);
  }

  render = () => (
      <ReactQuill
        value={ this.state.value }
        theme={ false }
      />
    )
}
