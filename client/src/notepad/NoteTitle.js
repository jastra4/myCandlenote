import React from 'react';
import ReactQuill , { Quill } from 'react-quill';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import './NoteTitle.css';

const styles = {
  fontWeight: 'bold',
  fontSize: '50px'
}

export default class NoteTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentWillMount() {
  }

  componentDidMount() {
    const value = JSON.parse(window.localStorage.getItem('noteTitle'))
    console.log('value: ', value);
    this.setState({ value });
    // this.formats = ['bold']
  }

  handleEditorChange = (value, d, source, editor) => {
    this.setState({ value });
    const delta = editor.getContents();
    console.log('delta: ', delta);
    const packet = JSON.stringify(delta);
    console.log('packet: ', packet);
    const string = `${packet}`;
    console.log('string: ', string);
    window.localStorage.setItem('noteTitle', packet);
  }


  render = () => (
    <div style={{fontSize: '50px !important'}}>
      <ReactQuill
        className='note'
        theme=""
        value={ this.state.value }
        onChange={ this.handleEditorChange }
        placeholder="Untitled"
        styles={styles}
        formats={[{"header":1}]}
      />
    </div>
  );
}
