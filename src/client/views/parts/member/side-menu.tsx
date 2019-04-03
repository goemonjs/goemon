import * as React from 'react';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

import { Link } from 'react-router-dom';

export const sideMenus = (
  <>
  <List>
    <div>
      <Link to="/member/">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="FormSample" />
        </ListItem>
      </Link>
      <Link to="/member/page">
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Page" />
        </ListItem>
      </Link>
    </div>
  </List>
  <Divider />
  <List>
    <div>
    <Link to="/member/profile">
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
          <ListItemText primary="Profile" />
      </ListItem>
      </Link>
    </div>
  </List>
  </>
);
