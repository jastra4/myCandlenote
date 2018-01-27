import React from 'react';
import 'medium-draft/lib/index.css';
import { Editor, createEditorState } from 'medium-draft';

const styles = { backgroundColor: '#EDEAD0 !important;' };

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: createEditorState() };
  }

  /*
    this.state = {
      editorState: createEditorState(data), // with content
    };
    */

  componentDidMount() {
    this.refs.editor.focus();
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        ref="editor"
        editorState={editorState}
        onChange={this.onChange}
        styles={styles}
      />
    );
  }
}
