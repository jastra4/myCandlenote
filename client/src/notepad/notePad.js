import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import _ from 'lodash';

export default class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentWillMount() {
    this.props.changeBackgroundColor('#1F1F1F');
  }

  componentDidMount() {
    const value = JSON.parse(window.localStorage.getItem('noteContent'));
    this.setState({ value });
  }

  handleEditorChange = (value, d, source, editor) => {
    this.setState({ value });
    const delta = editor.getContents();
    const packet = JSON.stringify(delta);
    window.localStorage.setItem('noteContent', packet);
    const content = this.getContentFromDelta(delta);
    _.debounce(this.parseContentMeaning, 1000)(content);
  }

  getContentFromDelta = delta => (
    delta.ops.reduce((tv, cv) => (
      tv.concat(cv.insert.replace(/↵|\r\n|\r|\n|"|'/g, ''))
    ), '')
  )

  // TODO: Use return value from this function to build IntelliSearch
  parseContentMeaning = content => (
    axios.post('api/parseContentMeaning', { content })
      .then(({ data: { meaning } }) => {
        console.log('Per Google, the meaning of your text is: ', meaning);
        return meaning;
      })
  );

  render = () => (
    <ReactQuill
      value={ this.state.value }
      onChange={ this.handleEditorChange }
      placeholder="Let's take some notes!"
    />
  );
}
