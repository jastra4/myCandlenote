import React from 'react';
import axios from 'axios';
import { Form, Card, Input } from 'semantic-ui-react';

export default class UserSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      foundUser: {},
      isUserFound: false,
    };
  }

  handleInputChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <Card className="user-search-box">
        <Form>
          <Form.Field>
            <label>Search usernames</label>
            <Input type='text' onChange={this.handleInputChange.bind(this)} />
          </Form.Field>
        </Form>
      </Card>
    );
  }
}
