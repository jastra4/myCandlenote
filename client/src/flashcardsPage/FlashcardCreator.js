import React from 'react';
import { Segment, Button, Form } from 'semantic-ui-react';

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
      selectedDeck: '',
    };
  }

  onFrontChange(e) {
    this.setState({ front: e.target.value });
  }

  onBackChange(e) {
    this.setState({ back: e.target.value });
  }

  onDeckChange(e, selection) {
    this.setState({ selectedDeck: selection.value });
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

    const { front, back } = this.state;

    this.props.createFlashcard({
      front,
      back,
      deckId: this.state.selectedDeck,
    });

    this.setState({
      front: '',
      back: '',
      hasFrontImage: false,
      hasBackImage: false,
    });
  }

  render() {
    return (
      <div>
        <Segment>
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
              <Form.Dropdown
                selection
                placeholder='Deck'
                options={mapDecksToOptions(this.props.decksById)}
                onChange={this.onDeckChange.bind(this)}
              />
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default FlashcardCreator;
