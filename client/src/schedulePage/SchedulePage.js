import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import momentTz from 'moment-timezone';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      title: '',
      newEvent: {},
    };
  }

  componentDidMount() {
    console.log('UserID:', this.props.userId);
    if (this.props.userId) {
      axios.post('/api/refreshToken', { userId: this.props.userId })
        .then(() => axios.post('/api/freeBusy', { userId: this.props.userId }))
        .then((res) => {
          const events = res.data.map(event => ({
            start: new Date(event.start),
            end: new Date(event.end),
            title: event.title,
          }));
          console.log('Cal Response:', events);
          this.setState({ events });
        })
        .catch(err => console.log('Cal err:', err));
    }
  }

  handleSelectSlot(slotInfo) {
    if (!this.state.title) alert('Please give this event a title.');
    else {
      const slot = {
        start: slotInfo.start,
        end: slotInfo.end,
        title: this.state.title,
      };
      this.setState({
        newEvent: slot,
        events: this.state.events.concat(slot),
      });
    }
  }

  handleInputChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    //TODO: send new busy slots to server
    const { newEvent, title } = this.state;
    const timeZone = momentTz.tz.guess();
    // axios.post
  }

  render() {
    return (
      <div className="calendar-container">
        <BigCalendar
          selectable
          events={this.state.events}
          defaultView="week"
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(Date.now())}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={slotInfo => this.handleSelectSlot(slotInfo)}
        />
        <input type="text" placeholder="Event title" value={this.state.title} onChange={this.handleInputChange.bind(this)}/>
        <button type="button" onClick={this.handleSubmit.bind(this)}>Confirm Events</button>
      </div>
    );
  }
}
