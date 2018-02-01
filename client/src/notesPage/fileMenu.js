import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import EmailModal from './emailModal';

export default class FileMenu extends React.Component {
  state = { };

  renderPDF = () => {
    window.open('http://localhost:3000/api/pdf/70f744e6-26c4-4f7d-b0b2-c6aeebf02f0e');
  }

  render = () => (
    <div>
      <Button animated='fade'>
        <Button.Content hidden>New</Button.Content>
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
      <Button animated='fade' onClick={ this.renderPDF } >
        <Button.Content hidden>PDF</Button.Content>
        <Button.Content visible>
          <Icon name='file pdf outline' />
        </Button.Content>
      </Button>
      <Button animated='fade'>
        <Button.Content hidden>Delete</Button.Content>
        <Button.Content visible>
          <Icon name='trash' />
        </Button.Content>
      </Button>
    </div>
  );
}
