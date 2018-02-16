import React from 'react';
import { Form, Input, Button, Segment, Divider, Grid, Message } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

class DeckCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      title: '',
      improperSubmit: false,
    };
  }

  onSubjectChange(e) {
    this.setState({ subject: e.target.value });
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (!this.state.subject || !this.state.title) {
      this.setState({ improperSubmit: true });
    } else {
      const deckInfo = {
        ...this.state,
        userId: this.props.userId,
      };
      this.props.createDeck(deckInfo);
      this.setState({
        subject: '',
        title: '',
        improperSubmit: false,
      });
    }
  }

  render() {
    return (
        <div className="deck-creator-container">
          <Segment>
            <Form onSubmit={e => this.onFormSubmit(e)}>
              <Grid columns="equal">
                <Grid.Column>
                  {this.state.improperSubmit ?
                    <Message negative onDismiss={() => this.setState({ improperSubmit: false })}>
                      <Message.Header>Missing Field(s)</Message.Header>
                      <p>You must provide a subject and title to create a deck.</p>
                    </Message> : ''}
                  <Form.Field control={Input} value={this.state.subject} label='Subject' placeholder='Subject' onChange={e => this.onSubjectChange(e)} />
                  <Divider />
                  <Form.Field control={Input} value={this.state.title} label='Title' placeholder='Title' onChange={e => this.onTitleChange(e)} />
                  <MediaQuery maxWidth={499}>
                    <Divider />
                    <Form.Field>
                      <Form.TextArea placeholder="Description (optional)" rows="2" />
                    </Form.Field>
                  </MediaQuery>
                  <Form.Field id='form-button-control-public' control={Button} content='Confirm' label='Create Deck' />
                </Grid.Column>
                <MediaQuery minWidth={500}>
                  <Grid.Column width={10}>
                    <div style={{ paddingTop: '1.65em' }}>
                      <Form.TextArea placeholder="Description (optional)" rows="10" />
                    </div>
                  </Grid.Column>
                </MediaQuery>
              </Grid>
            </Form>
          </Segment>
        </div>
    );
  }
}

export default DeckCreator;
