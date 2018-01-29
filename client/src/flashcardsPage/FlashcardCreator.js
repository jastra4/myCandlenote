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
      urlFront: '',
      urlBack: '',
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
    console.log('FRONT:', urlData);
    this.setState({ urlFront: urlData });
  }

  onUploadBack(urlData) {
    console.log('BACK:', urlData);
    this.setState({ urlBack: urlData });
  }

  clearFields() {
    this.setState({
      front: '',
      back: '',
      urlFront: '',
      urlBack: '',
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
      urlFront: '',
      urlBack: '',
    });
  }

  render() {
    return (
      <div>
        <Segment>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Form.Field>
              <label>Prompt</label>
              <Form.TextArea placeholder='Prompt' value={this.state.front} onChange={this.onFrontChange.bind(this)} rows="4" />
              {this.state.urlFront ? <img src={this.state.urlFront}/> :
              <FlashcardImageUploader onImageLoaded={this.onUploadFront.bind(this)} />}
            </Form.Field>
            <Form.Field>
              <label>Answer</label>
              <Form.TextArea placeholder='Answer' value={this.state.back} onChange={this.onBackChange.bind(this)} rows="4" />
              {this.state.urlBack ? <img src={this.state.urlBack} /> :
              <FlashcardImageUploader onImageLoaded={this.onUploadBack.bind(this)} />}
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
