import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';

export default class InvisibleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentWillMount() {
    const { location: { pathname } } = this.props;
    const noteToPrint = pathname.split('/').pop();
    noteToPrint && axios.post('/api/getEditorPacket', { noteToPrint })
      // .then(({ data: { data: packet } }) => {
      .then((packet) => {
        const value = JSON.parse(packet);
        this.setState({ value });
      });
  }

  componentDidMount() {
  }

  render = () => (
      <ReactQuill
        value={ this.state.value }
        theme={ false }
      />
  )
}
