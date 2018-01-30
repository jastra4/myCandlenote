import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

export default class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    console.log('props: ', props);
  }

  componentWillMount() {
    const { location: { pathname } } = this.props;
    const fileName = pathname.split('/').pop();
    console.log('fileName: ', fileName);
    fileName && axios.post('/api/getEditorPacket', { fileName })
      .then(({ data:packet }) => {
        console.log('Packet receieved!: ', packet);
      })
      .catch((e) => console.error(e));
  }

  componentWillReceiveProps = (nextProps) => {
  };

  render = () => {
    return (
      <div>{'Hehe'}</div>
    )
  }
    // <ReactQuill
    //   value={this.state.value}
    //   onChange={this.handleEditorChange}
    //   placeholder="Let's take some notes!"
    // />
}
