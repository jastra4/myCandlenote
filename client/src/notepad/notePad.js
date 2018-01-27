import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentWillMount() {
    this.props.changeBackgroundColor('#1F1F1F');
  }

  componentDidMount() {
    const value = JSON.parse(window.localStorage.getItem('delta'))
    this.setState({ value });
  }

  handleEditorChange = (value, d, source, editor) => {
    this.setState({ value });
    const delta = editor.getContents();
    console.log('delta: ', delta);
    const packet = JSON.stringify(delta);
    console.log('packet: ', packet);
    const string = `${packet}`;
    console.log('string: ', string);
    window.localStorage.setItem('noteContent', packet);
  }


  render = () => (
    <ReactQuill
        value={ this.state.value }
        onChange={ this.handleEditorChange }
        placeholder="Let's take some notes!"
    />
  );
}
