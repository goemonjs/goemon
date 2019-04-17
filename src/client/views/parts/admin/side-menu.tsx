import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { Link } from 'react-router-dom';

export const sideMenus = (
  <>
  <List>
    <div>
      <Link to="/admin/">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Top" />
        </ListItem>
      </Link>
    </div>
  </List>
  </>
);
