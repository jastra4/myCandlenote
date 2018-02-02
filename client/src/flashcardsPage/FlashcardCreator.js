import React from 'react';
import { Segment, Button, Form, Message } from 'semantic-ui-react';

import FlashcardImageUploader from './FlashcardImageUploader';

const mapDecksToOptions = decksById => (
  Object.keys(decksById).map(key => ({
    key,
    text: decksById[key].title,
    value: decksById[key].id,
  }))
);


class FlashcardCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      front: '',
      back: '',
      hasFrontImage: false,
      hasBackImage: false,
      selectedDeckId: '',
      improperSubmit: false,
    };
  }

  onFrontChange(e) {
    this.setState({ front: e.target.value });
  }

  onBackChange(e) {
    this.setState({ back: e.target.value });
  }

  onDeckChange(e, selection) {
    this.setState({ selectedDeckId: selection.value });
  }

  onUploadFront(urlData) {
    this.setState({
      front: urlData,
      hasFrontImage: true,
    });
  }

  onUploadBack(urlData) {
    this.setState({
      back: urlData,
      hasBackImage: true,
    });
  }

  clearFields() {
    this.setState({
      front: '',
      back: '',
      hasFrontImage: false,
      hasBackImage: false,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const { front, back, selectedDeckId } = this.state;
    if (front && back && selectedDeckId) {
      this.props.createFlashcard({
        front,
        back,
        deckId: this.state.selectedDeckId,
        userId: this.props.currentUser.userId,
      });

      this.setState({
        front: '',
        back: '',
        hasFrontImage: false,
        hasBackImage: false,
        improperSubmit: false,
      });
    } else {
      this.setState({ improperSubmit: true });
    }
  }

  render() {
    return (
      <div>
        <Segment>
          {this.state.improperSubmit ?
            <Message negative compact onDismiss={() => this.setState({ improperSubmit: false })}>
              <Message.Header>Missing Field(s)</Message.Header>
              <p>You must provide a front, back and deck to create a flashcard</p>
            </Message> : ''}
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Form.Field>
              <label>Prompt</label>
              {this.state.hasFrontImage ? <img src={this.state.front}/> :
                <FlashcardImageUploader onImageLoaded={this.onUploadFront.bind(this)} buttonTag={'Upload Image Prompt'}>
                <Form.TextArea placeholder='Prompt' value={this.state.front} onChange={this.onFrontChange.bind(this)} rows="4" />
              </FlashcardImageUploader>}
            </Form.Field>
            <Form.Field>
              <label>Answer</label>
              {this.state.hasBackImage ? <img src={this.state.back} /> :
              <FlashcardImageUploader onImageLoaded={this.onUploadBack.bind(this)} buttonTag={'Upload Image Answer'}>
                <Form.TextArea placeholder='Answer' value={this.state.back} onChange={this.onBackChange.bind(this)} rows="4" />
              </FlashcardImageUploader>}
            </Form.Field>
            <Form.Group inline>
              <Button type='submit'>Submit</Button>
              <Button type='button' onClick={this.clearFields.bind(this)}>Clear Fields</Button>
              <From.Field>
                <Form.Dropdown
                  selection
                  placeholder='Deck'
                  options={mapDecksToOptions(this.props.decksById)}
                  onChange={this.onDeckChange.bind(this)}
                />
              </From.Field>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default FlashcardCreator;
