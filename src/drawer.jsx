import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ContactsIcon from '@material-ui/icons/Contacts';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({ 
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export function TemporaryDrawer(p) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => (
    (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    }
  );

  const sideList = (side) => (
    <div
      className={classes.list}
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        Friend
      </List>
      <Divider />
      <List>
        Another friend
      </List>
    </div>
  );

  return (
    <div >
        <div >
            <IconButton 
                onClick={toggleDrawer('left', true)}
                style={{color: "white"}}
            >
                <ContactsIcon />
            </IconButton>
        </div>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}