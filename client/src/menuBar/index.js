import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

class MenuBar extends Component {
  state = { visible: true }


  render() {
    return (
      <div>
          <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='write'>
              <Icon name='write' />
              Notes
            </Menu.Item>
            <Menu.Item name='vcard outline'>
              <Icon name='vcard outline' />
              Flashcards
            </Menu.Item>
            <Menu.Item name='book'>
              <Icon name='book' />
              Library
            </Menu.Item>
            <Menu.Item name='student'>
              <Icon name='student' />
              Study Hall
            </Menu.Item>
            <Menu.Item name='winner'>
              <Icon name='winner' />
              Quizzlet
            </Menu.Item>
          </Sidebar>
      </div>
    )
  }
}

export default MenuBar
