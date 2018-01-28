import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default () => (
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
    <Button animated='fade'>
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
