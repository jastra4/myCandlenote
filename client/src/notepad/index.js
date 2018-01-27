import React from 'react';
// import Canvas from './canvas';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  modules: {
    toolbar: [

    ]
  }

  componentWillMount() {
    this.props.changeBackgroundColor('#1F1F1F');
  }

  handlechange = (text) => {
    this.setState({ text });
    console.log('this.state.text: ', this.state.text);
  }

  render = () => (
    <div>
      <ReactQuill
        value={ this.state.text }
        onChange={ this.handleChange }
      />
    </div>
  );
}
