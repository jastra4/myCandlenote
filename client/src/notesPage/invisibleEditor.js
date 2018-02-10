import ReactQuill from 'react-quill';
import React from 'react';
import axios from 'axios';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';

const titleStyle = { textAlign: 'center' };

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
    const { location: { pathname } } = this.props;
    const noteToPrint = pathname.split('/').pop();
    noteToPrint && axios.post('/api/getEditorPacket', { noteToPrint })
      .then(({ data }) => {
        const { packet, title, username: author, showDate } = data;
        const value = JSON.parse(packet);
        this.setState({
          value, title, author, showDate,
        });
      });
  }

  render = () => (
    <div>
    { this.state.title &&
    <div style={ titleStyle }>
      <h2><strong>{ this.state.title }</strong></h2>
    </div>
    }
    {
      this.state.author &&
      <div style={ authorStyle }>
       <em>by </em><strong>{ this.state.author }</strong>
      </div>
    }
    {
      this.state.showDate &&
      <div style={ dateStyle }>{ moment().format('MMMM Do, YYYY') }</div>
    }
    {
      (this.state.title || this.state.author || this.state.showDate)
      && <hr/>
    }
    <ReactQuill
        value={ this.state.value }
        theme={ false }
        />
    </div>
  )
}
