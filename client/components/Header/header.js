import React, { useContext, useState, useRef, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import Link from 'next/link';

import AuthContext from '../../contexts/AuthContext';
import styles from './styles';

const Header = props => {
  const { isAuth, logOut, signIn } = useContext(AuthContext);
  const { classes } = props;
  const [ open, setOpen ] = useState(false);
  const [ mobileOpen, setMobileOpen ] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  const handleClose = evt => {
    if (anchorRef.current && anchorRef.current.contains(evt.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [ open ]);

  const mobileMenuList = (
    <List component='nav'>
      <Link href='/'>
        <ListItemText className={classes.mobileListItem} primary='Home' />
      </Link>
      <Link href='/establishments'>
        <ListItemText
          className={classes.mobileListItem}
          primary='Establishments'
        />
      </Link>
      <Link href='/contact'>
        <ListItemText className={classes.mobileListItem} primary='Contact' />
      </Link>

      {isAuth ? (
        <Link href='/admin'>
          <ListItemText
            className={classes.mobileListItem}
            primary='Dashboard'
          />
        </Link>
      ) : null}
    </List>
  );

  return (
    <AppBar position='fixed'>
      <Container>
        <Toolbar disableGutters>
          <Hidden only={[ 'sm', 'md', 'lg', 'xl' ]}>
            <IconButton
              className={classes.mobileIconButton}
              onClick={() => setMobileOpen(true)}
              edge='start'
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon className={classes.mobileMenuIcon} />
            </IconButton>
            <Drawer
              anchor='top'
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
            >
              <div
                tabIndex={0}
                role='button'
                onClick={() => setMobileOpen(false)}
                onKeyDown={() => setMobileOpen(false)}
              >
                {mobileMenuList}
              </div>
            </Drawer>
          </Hidden>
          <Link href='/'>
            <div className={classes.logoWrapper}>
              <img
                src={require('../../public/images/logoName.png')}
                className={classes.logo}
                alt='Holidaze Logo'
              />
            </div>
          </Link>
          <Hidden only={[ 'xs' ]}>
            <Link href='/'>
              <Button color='inherit' className={classes.headerLink}>
                Home
              </Button>
            </Link>
            <Link href='/establishments'>
              <Button color='inherit' className={classes.headerLink}>
                Establishments
              </Button>
            </Link>
            <Link href='/contact'>
              <Button color='inherit' className={classes.headerLink}>
                Contact
              </Button>
            </Link>
            {isAuth ? (
              <>
                <Typography variant='body2' className={classes.name}>
                  Jan Henning
                </Typography>
                <Avatar
                  alt='Profile Picture'
                  src='https://avatars1.githubusercontent.com/u/27323317?s=460&v=4'
                  className={classes.avatar}
                  ref={anchorRef}
                  aria-controls={open ? 'menu' : undefined}
                  aria-haspopup='true'
                  onClick={() => setOpen(!open)}
                />
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom'
                            ? 'center top'
                            : 'center bottom'
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id='menu'>
                            <MenuItem onClick={signIn}>Dashboard</MenuItem>
                            <MenuItem onClick={logOut}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </>
            ) : (
              <Link href='/login'>
                <Button color='inherit' className={classes.headerButton}>
                  Log In
                </Button>
              </Link>
            )}
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
