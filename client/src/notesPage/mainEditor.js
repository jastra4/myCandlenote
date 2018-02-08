import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import _ from 'lodash';

export default class MainEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    console.log('props: ', props);

    this.debouncedParseContentMeaning = _.debounce(this.parseContentMeaning, 1000);
    this.debouncedHandleTextChange = _.debounce(this.handleTextChange, 1000);
  }
  componentDidMount() {
    this.props.changeBackgroundColor('#1F1F1F');
    const { title, content: value = '' } = this.props;
    this.setState({
      title,
      value,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearNote) {
      this.setState({
        value: '', 
        clearNote: true, 
        packet: '',
      });
      _.defer(this.setState.bind(this), { clearNote: false });
    }
  }

  componentWillUnmount() {
    this.state.packet && this.handleTextChange({
      noteId: this.props.currentNote,
      body: this.state.packet,
    });
  }

  handleEditorChange = (value, d, source, editor) => {
    const delta = editor.getContents();
    const packet = JSON.stringify(delta);
    this.setState({
      value, packet,
    });
    const content = this.getContentFromDelta(delta);
    this.debouncedParseContentMeaning(content);
    this.debouncedHandleTextChange({
      noteId: this.props.currentNote,
      body: packet,
    });
  }

  handleTextChange = (noteInfo) => { this.props.editNote(noteInfo); }


  getContentFromDelta = delta => (
    delta.ops.reduce((tv, cv) => (
      tv.concat(cv.insert.replace ? cv.insert.replace(/↵|\r\n|\r|\n|"|'/g, '') : cv.insert)
    ), '')
  );

  parseContentMeaning = content => (
    axios.post('api/parseContentMeaning', { content })
      .then(({ data: { meaning } }) => {
        this.props.setCurrentMeaning(meaning);
        return meaning;
      })
  );


  handlePrint = () => {
    const { packet } = this.state;
    axios.post('/api/tempSavePacket', { packet })
      .catch((e) => { console.error(e); });
  }

  render = () => (
    <div>
      <ReactQuill
        theme='snow'
        value={ this.state.value }
        onChange={ !this.clearNote && this.handleEditorChange }
        placeholder="Let's take some notes!"
        formats={ MainEditor.formats }
        modules={ MainEditor.modules }
        />
    </div>
  );
}

MainEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

MainEditor.modules = { toolbar: [
  [{ header: '1' }, { header: '2' }, { font: [] }],
  [{ size: [] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' },
    { indent: '-1' }, { indent: '+1' }],
  ['link', 'image', 'video'],
  ['clean'],
] };
