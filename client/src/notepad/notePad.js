import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import _ from 'lodash';


export default class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.debouncedParseContentMeaning = _.debounce(this.parseContentMeaning, 2000);
    // this.debouncedParseContentMeaning = _.throttle(this.parseContentMeaning, 2000);
  }

  componentWillMount() {
    this.props.changeBackgroundColor('#1F1F1F');
  }

  componentDidMount() {
    const value = JSON.parse(window.localStorage.getItem('noteContent'));
    this.setState({ value });
  }

  handleEditorChange = (value, d, source, editor) => {
    if (true) {
      this.setState({
        value,
        buffer: 0,
      });
      const delta = editor.getContents();
      const packet = JSON.stringify(delta);
      window.localStorage.setItem('noteContent', packet);
      const content = this.getContentFromDelta(delta);
      this.debouncedParseContentMeaning(content);
    } else {
      this.setState({
        value,
        buffer: this.state.buffer + 1,
      });
    }
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
        this.props.setCurrentMeaning(meaning);
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
