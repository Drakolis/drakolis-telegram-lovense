import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Collapse,
  Paper,
  Grid,
  Switch,
} from '@material-ui/core';
import { Menu, FilterList } from '@material-ui/icons';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { toggleLovenseModal } from '../actions/lovense';

const TypographyGrow = styled(Typography)`
  flex-grow: 1;
`;

const TypographyMiddle = styled(Typography)`
  top: 25%;
  position: relative;
`;

function NavBar({ dispatch }) {
  const [drawer, setDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Menu"
            onClick={() => dispatch(toggleLovenseModal())}
          >
            <Menu />
          </IconButton>
          <TypographyGrow variant="h5">Telegram-Lovense</TypographyGrow>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="Filters"
            // onClick={() => toggleDrawer()}
          >
            <FilterList />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Collapse in={drawer}>
        <Paper>
          <Grid container justify="center">
            <Grid item xs={2}>
              <TypographyMiddle variant="h6">Show</TypographyMiddle>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Users</Typography>
              <Switch />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Groups</Typography>
              <Switch />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Channels</Typography>
              <Switch />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={2}>
              <TypographyMiddle variant="h6">All</TypographyMiddle>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Users</Typography>
              <Switch />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Groups</Typography>
              <Switch />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Channels</Typography>
              <Switch />
            </Grid>
          </Grid>
        </Paper>
      </Collapse>
    </div>
  );
}

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(NavBar);
