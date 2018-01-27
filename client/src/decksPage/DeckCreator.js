import React from 'react';
import { Form, Input, Button, Segment, Divider, Container } from 'semantic-ui-react';
import { v1 } from 'uuid';

class DeckCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      title: '',
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
    const deckInfo = {
      ...this.state,
      id: v1(),
      userId: this.props.userId,
    };

    this.props.addDeck(deckInfo);

    this.setState({
      subject: '',
      title: '',
    });
  }

  render() {
    return (
      <Container>
        <Segment>
          <Form onSubmit={e => this.onFormSubmit(e)}>
            <Form.Field control={Input} value={this.state.subject} label='Subject' placeholder='Subject' onChange={e => this.onSubjectChange(e)} />
            <Divider />
            <Form.Field control={Input} value={this.state.title} label='Title' placeholder='Title' onChange={e => this.onTitleChange(e)} />
            <Form.Field id='form-button-control-public' control={Button} content='Confirm' label='Create Deck' />
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default DeckCreator;
