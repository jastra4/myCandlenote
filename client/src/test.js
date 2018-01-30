import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

export default class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  render = () => (
    // <ReactQuill
    //   value={this.state.value}
    //   onChange={this.handleEditorChange}
    //   placeholder="Let's take some notes!"
    // />
    <div>Hello World</div>
  );
}
