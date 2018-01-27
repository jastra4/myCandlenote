import React from 'react';
import 'medium-draft/lib/index.css';
import Bob, { Editor, createEditorState, RichUtils } from 'medium-draft';

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

  componentWillMount() {
    console.log('Bob: ', Bob)

  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  };


  render() {
    const { editorState } = this.state;

    console.log('ilineStiles: ', editorState.getCurrentInlineStyle());

    return (
      <Editor
        ref="editor"
        editorState={editorState}
        onChange={this.onChange}
        styles={styles}
        placeholder="Take some notes..."
        blockStyleFn={() => {'background-color: red'}}
      />
    );
  }
}
