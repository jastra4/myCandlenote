import React, { Component } from 'react';
import { Button, Modal, Input, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { isEmail } from 'validator';

class EmailModalButton extends Component {
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
  }

  render = () => (
    <Button.Group>
      <Button disabled={ this.state.disabled } >Cancel</Button>
      <Button.Or />
      <Button
        disabled={ this.state.disabled }
        onClick={ this.handleButtonClick }
        positive>Save
      </Button>
    </Button.Group>
  )
}

const EmailButtonFileMenu = () => (
  <Button animated='fade'>
    <Button.Content hidden>Email</Button.Content>
    <Button.Content visible>
      <Icon name='mail' />
    </Button.Content>
  </Button>
);

export default class EmailModal extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      disabled: true,
      stage: 0,
    };
  }

  emailPDF = () => {
    const { email } = this.state;
    axios.post('/api/emailPDF', { email })
      .then(() => {
        alert(`Email successfully sent to ${email} ✔`);
      })
      .catch((e) => { console.error(e); });
  }


  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState({ email });
    if (isEmail(email)) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }
  handleStage1Click = () => {
    this.setState({ stage: 1 });
  }

  handleStage1Click = () => {
    this.setState({ stage: 2 });
  }

  handleStage2Click = () => {
    this.setState({ stage: 0 });
  }


/* eslint-disable */
  render = () => (
    <Modal trigger={
      <Button animated='fade'>
        <Button.Content hidden>Email</Button.Content>
        <Button.Content visible>
          <Icon name='mail' />
        </Button.Content>
      </Button>
    }>
       <Modal.Header>Select an Email Recipient</Modal.Header>
       { this.state.stage === 0 &&
        <Modal.Content image>
          {/* <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' /> */}
          <Modal.Description>
            <p>Please enter the email address you would like to send your note to</p>
            <Input
              iconPosition='left'
              value={ this.state.email }
              onChange={ this.handleEmailChange }
              placeholder='Email'
              focus={true}
              >
               <Icon name='mail' />
               <input autoFocus/>
            </Input>
            <EmailModalButton 
              emailPDF={ this.emailPDF } 
              disabled={ this.state.disabled } 
              handleStage0Click={ this.handleStage0Click } 
            />
          </Modal.Description>
        </Modal.Content>
       }

      {
        this.state.stage === 1 &&
        <Modal.Content image>
          {/* <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' /> */}
          <Modal.Description>
            <div>In Progress Son</div>
            <Button onClick={ this.handleStage1Click } ></Button>
          </Modal.Description>
        </Modal.Content>

      }
      {
        this.state.stage === 2 &&
        <Modal.Content image>
          {/* <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' /> */}
          <Modal.Description>
            <div>Done son.</div>
            <Button onClick={this.handleStage2Click} ></Button>
          </Modal.Description>
        </Modal.Content>

      }
      </Modal>
  )
}

