import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import momentTz from 'moment-timezone';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Segment } from 'semantic-ui-react';
import ScheduleGroupMaker from './ScheduleGroupMaker';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      title: '',
      description: '',
      newEvent: {},
      group: [],
      friends: [],
    };
  }

  componentDidMount() {
    if (this.props.userId) {
      this.props.getFriends(this.props.userId);
      axios.post('/api/refreshToken', { userId: this.props.userId })
        .then(() => axios.post('/api/freeBusy', { userId: this.props.userId }))
        .then((res) => {
          const events = res.data.map(event => ({
            start: new Date(event.start),
            end: new Date(event.end),
            title: event.title,
          }));
          this.setState({
            events,
            group: this.state.group.concat(this.props.userId),
          });
        })
        .catch(err => console.log('Cal err:', err));
    }
  }

  handleSelectSlot(slotInfo) {
    if (!this.state.group.length) alert('Please sign in to use the calendar.');
    else if (!this.state.title) alert('Please give this event a title.');
    else {
      const slot = {
        start: slotInfo.start,
        end: slotInfo.end,
        title: this.state.title,
        description: this.state.description,
      };
      this.setState({
        newEvent: slot,
        events: this.state.events.concat(slot),
        title: '',
        description: '',
      });
      axios.post('/api/setCalendarEvents', {
        newEvent: slot,
        userIds: this.state.group,
        timeZone: momentTz.tz.guess(),
      })
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  componentWillReceiveProps(newProps) {
    console.log('NEW PROPS!!:', newProps);
    this.setState({
      ...this.state,
      friends: newProps.currentUser.friends,
    });
  }

  render() {
    return (
      <div className="calendar-container">
        <Segment>
          <input type="text" placeholder="Event title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
          <input type="text" placeholder="Event description" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}/>
          <BigCalendar
            selectable
            events={this.state.events}
            defaultView="week"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(Date.now())}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={slotInfo => this.handleSelectSlot(slotInfo)}
          />
          <ScheduleGroupMaker friends={this.state.friends} />
        </Segment>
      </div>
    );
  }
}
