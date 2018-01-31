import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import _ from 'lodash';
import { Document, Page } from 'react-pdf/build/entry.webpack';


export default class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentWillMount() {
    this.props.changeBackgroundColor('#1F1F1F');
  }

  componentDidMount() {
    console.log('pakcet???', window.localStorage.getItem('noteContent'));
    const value = JSON.parse(window.localStorage.getItem('noteContent'));
    this.setState({ value });
  }

  handleEditorChange = (value, d, source, editor) => {
    const delta = editor.getContents();
    const packet = JSON.stringify(delta);
    console.log('value: ', value);
    console.log('delta: ', delta);
    console.log('packet: ', packet);
    this.setState({
      value, packet,
    });
    window.localStorage.setItem('noteContent', packet);
    const content = this.getContentFromDelta(delta);
    _.debounce(this.parseContentMeaning, 1000)(content);
  }

  

  getContentFromDelta = delta => {
    console.log('delta: ', delta.ops);
    return (
    delta.ops.reduce((tv, cv) => (
      tv.concat(cv.insert.replace ? cv.insert.replace(/↵|\r\n|\r|\n|"|'/g, ''): cv.insert)
    ), '')
  )}

  // TODO: Use return value from this function to build IntelliSearch
  parseContentMeaning = content => (
    axios.post('api/parseContentMeaning', { content })
      .then(({ data: { meaning } }) => {
        console.log('Per Google, the meaning of your text is: ', meaning);
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
      <Document
        file="http://localhost:3000/api/pdf?fileName=0c00a9b1-a825-4fb6-ac18-d2698802de33"
        onLoadSuccess={this.onDocumentLoad}
      >
        <Page pageNumber={1} />
      </Document>
      <a href="http://localhost:3000/api/pdf?fileName=0c00a9b1-a825-4fb6-ac18-d2698802de33">Download</a>
      <button onClick={ this.handlePrint }>Print</button>
      <ReactQuill
        theme='snow'
        value={ this.state.value }
        onChange={ this.handleEditorChange }
        placeholder="Let's take some notes!"
        formats={ Notepad.formats }
        modules={ Notepad.modules }
        />
    </div>
  );
}


Notepad.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

Notepad.modules = { toolbar: [
  [{ header: '1' }, { header: '2' }, { font: [] }],
  [{ size: [] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' },
    { indent: '-1' }, { indent: '+1' }],
  ['link', 'image', 'video'],
  ['clean'],
] };
