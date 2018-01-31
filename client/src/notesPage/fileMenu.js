import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default class fileMenu extends React.Component {
  state = { };

  renderPDF = () => {
    window.open('http://localhost:3000/api/pdf/0c00a9b1-a825-4fb6-ac18-d2698802de33');
  }

  render = () => (
    <div>
      <Button animated='fade'>
        <Button.Content hidden>New</Button.Content>
        <Button.Content visible>
          <Icon name='file' />
        </Button.Content>
      </Button>
      <Button animated='fade'>
        <Button.Content hidden>Email</Button.Content>
        <Button.Content visible>
          <Icon name='mail' />
        </Button.Content>
      </Button>
      <Button animated='fade'>
        <Button.Content hidden>Print</Button.Content>
        <Button.Content visible>
          <Icon name='print' />
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
