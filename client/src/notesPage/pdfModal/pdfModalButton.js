import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class PDFModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      email: '',
      stage: 0,
    };
  }

  componentWillReceiveProps({ disabled }) {
    this.setState({ disabled });
  }

  handleButtonClick = () => {
    this.props.renderPDF();
    this.props.handleStage0Click();
  }

  render = () => (
    <Button.Group floated='right' >
      <Button
        onClick={this.props.handleStage1Click}
      >Cancel</Button>
      <Button.Or />
      <Button
        onClick={this.handleButtonClick}
        positive>Generate PDF
      </Button>
    </Button.Group>
  )
}
