import React from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';

const titleStyle = {
  textAlign: 'center',
};

const authorStyle = {
  display: 'inline',
  left: 0,
};

const dateStyle = {
  display: 'inline',
  right: 0,
  position: 'absolute',
};

export default class InvisibleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentWillMount() {
    const { 
      location: { pathname },
      title = 'Some Random Title',
      author = 'Kendrick Gardner',
    } = this.props;
    this.setState({ title, author });
    const noteToPrint = pathname.split('/').pop();
    noteToPrint && axios.post('/api/getEditorPacket', { noteToPrint })
      // .then(({ data: { data: packet } }) => {
      .then(({ data: value }) => {
        // console.log('packet: ', packet);
        // const value = JSON.stringify(packet);
        // console.log('value: ', value);
        this.setState({ value });
      });
  }

  componentDidMount() {
  }

  render = () => (
    <div>
    <div style={ titleStyle }>
      <h2><strong>{ this.state.title }</strong></h2>
    </div>
      <div style={ authorStyle }>
       <em>by </em><strong>{ this.state.author }</strong>
      </div>
      <div style={ dateStyle }>{ moment().format('MMMM Do, YYYY') }</div>
      {/* <span><em>by </em><strong>Kendrick Gardner</strong></span> */}
      <hr/>
        {/* <h4>{moment().format('MMMM Do, YYYY')}</h4> */}
    <ReactQuill
        value={ this.state.value }
        theme={ false }
        />
    </div>
  )
}
