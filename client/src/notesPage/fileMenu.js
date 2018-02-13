import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PdfModal from './pdfModal';
import EmailModal from './emailModal';

const fileMenuStyle = {
  textAlign: 'center',
};

class FileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { currentNote, notes, title } = this.props;
    this.setState({
      currentNote,
      notes,
      title,
    });
  }

  componentWillReceiveProps({ currentNote, notes, title }) {
    this.setState({
      currentNote,
      notes,
      title,
    });
  }

  renderPDF = (options, callback) => {
    const { currentNote, title } = this.state;
    axios.post('/api/generatePDF', {
      currentNote,
      title,
      ...options,
    })
      .then(() => {
        callback();
      })
      .catch((e) => { console.error(e); });
  }


  handleDownload = () => {
    const downloadUrl = `/api/downloadPDF/${this.state.currentNote}`;
    const link = document.createElement('a');
    link.setAttribute('href', downloadUrl);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render = () => (
    <div style={ fileMenuStyle } className='fileMenu' >
      <Button animated='fade' onClick={ this.props.handleCreateNewNote }>
        <Button.Content hidden >New</Button.Content>
        <Button.Content visible>
          <Icon name='file' size='big' />
        </Button.Content>
      </Button>
      <EmailModal />
      <Button animated='fade'>
        <Button.Content hidden>Share</Button.Content>
        <Button.Content visible>
          <Icon name='share alternate' size='big' />
        </Button.Content>
      </Button>
      <Button animated='fade' onClick={ this.handleDownload }>
        <Button.Content hidden>Download</Button.Content>
        <Button.Content visible>
          <Icon name='download' size='big' />
      </Button.Content>
      </Button>
      <PdfModal
        icon='print'
        renderPDF={ this.renderPDF }
        currentNote={ this.state.currentNote }
        text='Print'
      />
      <PdfModal
        icon='file pdf outline'
        renderPDF={ this.renderPDF }
        currentNote={ this.state.currentNote }
        text='PDF'
      />
      <Button animated='fade' onClick={ this.props.handleDelete }>
        <Button.Content hidden>Delete</Button.Content>
        <Button.Content visible>
          <Icon name='trash' size='big'/>
        </Button.Content>
      </Button>
    </div>
  );
}

export default withRouter(FileMenu);
