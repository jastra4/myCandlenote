import React from 'react';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick() {
    this.props.changeChat(this.props.group);
  }

  removeGroup = () => {
    console.log('removed group');
  }

  render() {
    return (
      <div>
        <div className='groupName' onClick={this.handleClick.bind(this)}>
          {this.props.group}
          <div onClick={this.removeGroup.bind(this)} className='groupRemove'>x</div>
        </div>
      </div>
    );
  }
}

export default Group;
