import React from 'react';
import BigCalendar from 'react-big-calendar';

export default class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.userId) {
      // TODO: get busy times
    }
  }

  render() {
    return (
      <div className="calendar-container">
      </div>
    );
  }
}
