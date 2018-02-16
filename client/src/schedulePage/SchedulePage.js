import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import momentTz from 'moment-timezone';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Segment, Modal, Button } from 'semantic-ui-react';
import ScheduleGroupMaker from './ScheduleGroupMaker';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: { group: [] },
      title: '',
      description: '',
      newEvent: {},
      group: [],
      friends: [],
      showWarning: false,
      warningMessage: '',
    };

    this.addFriendToGroup = this.addFriendToGroup.bind(this);
    this.removeFriendFromGroup = this.removeFriendFromGroup.bind(this);
  }

  componentDidMount() {
    if (this.props.userId) {
      this.setState({ group: [...this.state.group, this.props.userId] });
      this.props.getFriends(this.props.userId);
      this.getFreeBusyForUsers(this.props.userId);
    }
  }

  getFreeBusyForUsers(userId) {
    axios.post('/api/refreshToken', { userId })
      .then(() => axios.post('/api/freeBusy', { userId }))
      .then((res) => {
        const usersEvents = res.data.map(event => ({
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.title,
        }));
        const newEvents = {
          ...this.state.events,
          [userId]: usersEvents,
        };
        this.setState({ events: newEvents });
      })
      .catch(err => console.log('Cal err:', err));
  }

  handleSelectSlot(slotInfo) {
    if (!this.state.group.length) {
      this.setState({
        showWarning: true,
        warningMessage: 'Please sign in to use the calendar.',
      });
    } else if (!this.state.title) {
      this.setState({
        showWarning: true,
        warningMessage: 'Please enter a title for this event.',
      });
    } else {
      const slot = {
        start: slotInfo.start,
        end: slotInfo.end,
        title: this.state.title,
        description: this.state.description,
      };
      const newEvents = {
        ...this.state.events,
        group: this.state.events.group.concat(slot),
      };
      this.setState({
        newEvent: slot,
        events: newEvents,
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
    this.setState({
      ...this.state,
      friends: newProps.currentUser.friends,
    });
  }

  addFriendToGroup(friendId) {
    if (!this.state.group.includes(friendId)) {
      this.setState({ group: this.state.group.concat(friendId) });
      this.getFreeBusyForUsers(friendId);
    }
  }

  removeFriendFromGroup(friendId) {
    const newGroup = this.state.group.filter(id => id !== friendId);
    const newEvents = {
      ...this.state.events,
      [friendId]: [],
    };
    this.setState({
      group: newGroup,
      events: newEvents,
    });
  }

  render() {
    const allEvents = Object.keys(this.state.events).reduce((holder, userId) =>
      holder.concat(this.state.events[userId]), []);
    return (
      <div className="calendar-container">
        <Modal closeOnDimmerClick={true}
          closeOnDimmerClick size='tiny' open={this.state.showWarning}>
          <Modal.Content>
            <p>{this.state.warningMessage}</p>
            <Button type="button" onClick={() => this.setState({ showWarning: false })}>
              OK
            </Button>
          </Modal.Content>
        </Modal>
        <Segment>
          <input type="text" placeholder="Event title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
          <input type="text" placeholder="Description (optional)" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}/>
          <BigCalendar
            selectable
            events={allEvents}
            defaultView="week"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(Date.now())}
            onSelectSlot={slotInfo => this.handleSelectSlot(slotInfo)}
          />
          <ScheduleGroupMaker
            friends={this.state.friends}
            group={this.state.group}
            addFriendToGroup={this.addFriendToGroup}
            removeFriendFromGroup={this.removeFriendFromGroup}
          />
        </Segment>
      </div>
    );
  }
}
