import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

class GroupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        This is the GroupsList
      </div>
    );
  }
}

const mapStateToProps = state => ({  });

const GroupsListConnected = connect(mapStateToProps)(GroupsList);

export default GroupsListConnected;