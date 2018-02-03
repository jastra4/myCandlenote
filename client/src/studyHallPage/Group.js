import React from 'react';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick = () => {
    this.props.changeChat(this.props.group);
  }

  removeGroup() {
    // axios.post('/removeFriend', {
    //   user: this.props.username,
    //   friend: this.props.friend.username,
    // })
    //   .then((res) => {
    //     console.log('removed: ', res.data);
    //   });
  }

  render() {
    return (
      <div>
        <div className='groupName' onClick={this.handleClick.bind(this)}>
          {this.props.group}
        </div>
        <div onClick={this.removeGroup.bind(this)} className='groupRemove'>x</div>
      </div>
    );
  }
}

export default Group;
