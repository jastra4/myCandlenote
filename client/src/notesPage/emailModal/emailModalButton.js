import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class EmailModalButton extends Component {
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
    this.props.handleStage0Click();
    this.props.emailPDF();
    this.props.handleIncrementProgress();
  }

  render = () => (
    <Button.Group>
      <Button disabled={this.state.disabled} >Cancel</Button>
      <Button.Or />
      <Button
        disabled={this.state.disabled}
        onClick={this.handleButtonClick}
        positive>Save
      </Button>
    </Button.Group>
  )
}
