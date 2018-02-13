import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import PdfModal from './pdfModal';

export default class FileMenu extends React.Component {
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
        window.open(`http://localhost:3000/api/pdf/${currentNote}`);
      })
      .catch((e) => { console.error(e); });
  }

  render = () => (
    <div>
      <Button animated='fade' onClick={ this.props.handleCreateNewNote }>
        <Button.Content hidden >New</Button.Content>
        <Button.Content visible>
          <Icon name='file' />
        </Button.Content>
      </Button>
      <EmailModal />
      <Button animated='fade'>
        <Button.Content hidden>Share</Button.Content>
        <Button.Content visible>
          <Icon name='share alternate' />
        </Button.Content>
      </Button>
    <Button animated='fade' onClick={ this.renderPDF }>
        <Button.Content hidden>Download</Button.Content>
        <Button.Content visible>
          <Icon name='download' />
        </Button.Content>
      </Button>
      <Button animated='fade' onClick={ this.renderPDF } >
        <Button.Content hidden>Print</Button.Content>
        <Button.Content visible>
          <Icon name='print'/>
        </Button.Content>
      </Button>
      <PdfModal
        icon='file pdf outline'
        renderPDF={ this.renderPDF }
        currentNote={ this.state.currentNote }
      />
      <Button animated='fade' onClick={ this.renderPDF } >
        <Button.Content hidden>PDF</Button.Content>
        <Button.Content visible>
          <Icon name='file pdf outline' />
        </Button.Content>
      </Button>
      <Button animated='fade' onClick={ this.props.handleDelete }>
        <Button.Content hidden>Delete</Button.Content>
        <Button.Content visible>
          <Icon name='trash' />
        </Button.Content>
      </Button>
    </div>
  );
}
