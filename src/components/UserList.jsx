import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  ListItemAvatar,
} from '@material-ui/core';
import styled from 'styled-components';

const Scrollable = styled.div`
  overflow: scroll;
  height: 100%;
`;

export default class UserList extends Component {
  constructor() {
    super();
    this.state = {
      userlist: [
        {
          id: '1',
          username: 'Drakolis',
          notify: true,
        },
        {
          id: '2',
          username: 'Clara',
          notify: true,
        },
        {
          id: '3',
          username: 'Max',
          notify: false,
        },
        {
          id: '4',
          username: 'Drak0sha',
          notify: false,
        },
      ],
    };
  }

  switchUserById(id) {
    const { userlist } = this.state;
    const newUserlist = userlist.map(u => {
      if (u.id === id) {
        return {
          ...u,
          notify: !u.notify,
        };
      }
      return u;
    });
    this.setState({
      userlist: newUserlist,
    });
  }

  render() {
    const { userlist } = this.state;
    return (
      <Scrollable>
        <List>
          {userlist.map(user => (
            <ListItem>
              <ListItemAvatar />
              <ListItemText>{user.username}</ListItemText>
              <ListItemSecondaryAction>
                <Switch
                  color="primary"
                  checked={user.notify}
                  onChange={() => this.switchUserById(user.id)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Scrollable>
    );
  }
}
