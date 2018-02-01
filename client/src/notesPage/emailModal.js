import React, { Component } from 'react';
import { Button, Modal, Input, Icon, Progress } from 'semantic-ui-react';
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
    this.props.handleIncrementProgress();
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

export default class EmailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      disabled: true,
      stage: 0,
      progress: 30,
      modalOpen: false,
    };
    this.progressTimer;
  }
  
  // componentWillUpdate() {
  //   console.log('progress: ', this.state.progress);
  // }

  emailPDF = () => {
    const { email } = this.state;
    axios.post('/api/emailPDF', { email })
      .then(() => {
        this.setState({ progress: 100 });
      })
      .catch((e) => { console.error(e); });
  }

  handleIncrementProgress = () => {
    const incrementProgress = () => {
      const { progress } = this.state;
      const distance = 100 - progress;
      const newProgress = progress + (distance / 2);
      console.log('p', progress, newProgress);
      this.setState({ progress: newProgress });
    };
    setTimeout(incrementProgress, 500);
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
  handleStage0Click = () => {
    this.setState({ stage: 1 });
  }

  handleStage1Click = () => {
    this.setState({ 
      stage: 2,
      modalOpen: false,
    });

  }

  handleStage2Click = () => {
    this.setState({ stage: 0 });
  }


/* eslint-disable */
  render = () => (
    <Modal 
      trigger={
        <Button 
          animated='fade'
          onClick={()=>{ this.setState({ modalOpen: true }) }}
        >
          <Button.Content hidden>Email</Button.Content>
          <Button.Content visible>
            <Icon name='mail' />
          </Button.Content>
        </Button>
      }
      open={ this.state.modalOpen }
    >
       <Modal.Header>Send a CandleNote via Email</Modal.Header>
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
              handleIncrementProgress={ this.handleIncrementProgress }
            />
          </Modal.Description>
        </Modal.Content>
       }

      {
        this.state.stage === 1 &&
        <Modal.Content image>
          {/* <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' /> */}
          <Modal.Description>
            { 
              this.state.progress < 100 
              ? <div>In Progress Son</div> 
              : <div>Email successfully sent! 😎</div>
            }
            <Progress percent={this.state.progress} indicating autoSuccess></Progress>
            { 
              this.state.progress === 100 && 
              <Button 
                onClick={ this.handleStage1Click } 
                floated='right'  
              >Close</Button> 
            }
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

