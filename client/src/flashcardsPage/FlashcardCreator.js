import React from 'react';
import { v1 } from 'uuid';
import { Segment, Button, Form } from 'semantic-ui-react';

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
      selectedDeck: '',
    };

    console.log('State:', this.props);
  }

  onFrontChange(e) {
    this.setState({ front: e.target.value });
  }

  onBackChange(e) {
    this.setState({ back: e.target.value });
  }

  onDeckChange(e, selection) {
    console.log(selection.value);
    this.setState({ selectedDeck: selection.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { front, back } = this.state;

    this.props.addFlashcard({
      front,
      back,
      deckId: this.state.selectedDeck,
      id: v1(),
    });

    this.setState({
      front: '',
      back: '',
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Segment>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Form.Field>
              <label>Prompt</label>
              <Form.TextArea placeholder='Prompt' value={this.state.front} onChange={this.onFrontChange.bind(this)} rows="4" />
            </Form.Field>
            <Form.Field>
              <label>Answer</label>
              <Form.TextArea placeholder='Answer' value={this.state.back} onChange={this.onBackChange.bind(this)} rows="4" />
            </Form.Field>
            <Form.Group inline>
              <Button type='submit'>Submit</Button>
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
