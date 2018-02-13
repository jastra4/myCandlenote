import React from 'react';
import ReactQuill from 'react-quill';
// import axios from 'axios';

// import _ from 'lodash';

export default class MainEditor extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.getContentFromDelta = this.getContentFromDelta.bind(this);

    // this.debouncedParseContentMeaning = _.debounce(this.parseContentMeaning, 2000);
    // this.debouncedParseContentMeaning = _.throttle(this.parseContentMeaning, 2000);
  }

  componentWillMount() {
    // this.props.changeBackgroundColor('#1F1F1F');
  }

  componentDidMount() {
    const value = JSON.parse(window.localStorage.getItem('noteContent'));
    this.setState({ value });
    this.quillEditor.focus();
  }

  handleEditorChange (value, d, source, editor) {
    const delta = editor.getContents();
    const packet = JSON.stringify(delta);
    this.setState({
      value, packet,
    });
    window.localStorage.setItem('noteContent', packet);
    const content = this.getContentFromDelta(delta);
    console.log('change')
    chrome.runtime.sendMessage({ 
      action: 'updateNote',
      payload: {
        title: 'Default Title',
        body: packet,
      }
    });
  }


  getContentFromDelta (delta) {
    delta.ops.reduce((tv, cv) => (
      tv.concat(cv.insert.replace ? cv.insert.replace(/↵|\r\n|\r|\n|"|'/g, '') : cv.insert)
    ), '')
  };

  render() {
    return (
      <div>
        <ReactQuill
          ref={ (quillEditor) => { 
            this.quillEditor = quillEditor;
          }} 
          className='cn-quill'
          theme='snow'
          value={this.state.value}
          onChange={this.handleEditorChange}
          placeholder="Let's take some notes!"
          formats={MainEditor.formats}
          modules={MainEditor.modules}
        />
      </div>
    );
  };
}


MainEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

MainEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' },
    { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ]
};
