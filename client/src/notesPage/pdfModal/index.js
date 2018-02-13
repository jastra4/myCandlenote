import React, { Component } from 'react';
import { Button, Modal, Input, Icon, Progress, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import PdfModalButton from './PdfModalButton';

const checkboxStyle = {
  textAlign: 'left',
  margin: '10px auto',
  display: 'block',
}

export default class PdfModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      stage: 0,
      progress: 30,
      modalOpen: false,
      showDate: true, 
      showName: true, 
      showTitle: true,
    };
    this.progressTimer;
  }

  componentWillMount() {
    const { icon } = this.props;
    let modalHeader;
    icon === 'print'
      ? modalHeader = 'Configure your CandleNote'
      : modalHeader = 'Configure your CandleNote PDF';
    this.setState({ icon, modalHeader });
  }

  renderPDF = () => {
    const { showDate, showTitle, showName } = this.state;
    
    const options = {
      showDate,
      showTitle,
      showName,
    };

    this.props.renderPDF(options, () => {
      // callback();
      this.setState({ progress: 100 });
    });
  }

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      email: '',
    });
  }

  handleIncrementProgress = () => {
    const incrementProgress = () => {
      const { progress } = this.state;
      const distance = 100 - progress;
      const newProgress = progress + (distance / 2);
      this.setState({ progress: newProgress });
    };
    setInterval(incrementProgress, 500);
  }


  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState({
      email,
      disabled: !isEmail(email),
    });
  }

  handleStage0Click = () => {
    this.setState({ stage: 1 });
  }

  handleStage1Click = () => {
    this.setState({
      stage: 0,
      modalOpen: false,
      email: '',
    });
  }

  handleChange = (e, data) => {
    console.log('handlechange!')
    // console.log('data: ', data);
    const property = data['data-name'];
    // console.log('property: ', property);
    // console.log('statebefore: ', this.state)
    // console.log('this.state[property]: ', this.state[property]);
    // this.setState({ 'showName': !this.state['showName'] });
    this.setState({ [property]: !this.state[property] });
    // this.setState({ property: !this.state[property] });
    // console.log('stateafter: ', this.state)
  }
  /* eslint-disable */
  render = () => (
    <Modal
      trigger={
        <Button
          animated='fade'
          onClick={() => { this.setState({ modalOpen: true }) }}
        >
          <Button.Content hidden>PDF</Button.Content>
          <Button.Content visible>
            <Icon name={this.state.icon || 'file pdf outline' } />
          </Button.Content>
        </Button>
      }
      open={this.state.modalOpen}
    >

      <Modal.Header><Icon name='setting' />{ this.state.modalHeader }</Modal.Header>

      {this.state.stage === 0 &&
        <Modal.Content image>
          <Modal.Description>
            <div style={{ textAlign: 'center' }}>
              {/* <p>Options</p> */}
              <Form>
                <Checkbox 
                  style={ checkboxStyle }
                  toggle
                  // defaultChecked={true}
                  checked={ this.state.showTitle }
                  label='Show Title'
                  onClick={ this.handleChange }
                  data-name='showTitle'
                  />
                <Checkbox 
                  style={checkboxStyle}
                  toggle
                  // defaultChecked={true}
                  label='Show Name'
                  checked={ this.state.showName }
                  onClick={ this.handleChange }
                  data-name='showName'
                  />
                <Checkbox 
                  style={checkboxStyle}
                  toggle
                  // defaultChecked={true}
                  label='Show Date'
                  checked={ this.state.showDate }
                  onClick={ this.handleChange }
                  data-name='showDate'
                  />
              </Form>
            </div>
            <span>
              <PdfModalButton
                handleStage0Click={this.handleStage0Click}
                handleStage1Click={this.handleStage1Click}
                handleIncrementProgress={this.handleIncrementProgress}
                renderPDF={ this.renderPDF }
              />
            </span>
          </Modal.Description>
        </Modal.Content>
      }


      {
        this.state.stage === 1 &&
        <Modal.Content image>
          <Modal.Description>
            {
              this.state.progress < 100
                ? <div style={{ textAlign: 'center' }}>Generating PDF</div>
                : <div style={{ textAlign: 'center' }}>PDF Successfully Generated!</div>
            }

            <Progress percent={this.state.progress} indicating autoSuccess></Progress>

            {
              this.state.progress === 100 &&
              <Button
                onClick={this.handleStage1Click}
                floated='right'
                positive
              >Close</Button>
            }
          </Modal.Description>
        </Modal.Content>
      }


    </Modal>
  )
}

