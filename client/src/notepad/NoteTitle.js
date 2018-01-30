import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import './NoteTitle.css';

// const styles = {
//   fontWeight: 'bold',
//   fontSize: '50px'
// }

export default class NoteTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    const value = JSON.parse(window.localStorage.getItem('noteTitle'));
    this.setState({ value });
    // this.formats = ['bold']
  }

  handleEditorChange = (value, d, source, editor) => {
    this.setState({ value });
    const delta = editor.getContents();
    const packet = JSON.stringify(delta);
    window.localStorage.setItem('noteTitle', packet);
  }


  render = () => (
    <div style={{ fontSize: '50px !important' }}>
      <ReactQuill
        className='note'
        theme=""
        value={ this.state.value }
        onChange={ this.handleEditorChange }
        placeholder="Untitled"
        // styles={styles}
        // formats={[{"header":1}]}
      />
    </div>
  );
}
