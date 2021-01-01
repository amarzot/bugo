import React from 'react';
import { useStaticQuery, graphql } from "gatsby";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import { Link } from "gatsby-theme-material-ui";
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  flexGrow: {
    flexGrow: 1
  },
  appBarButton: {
    color: theme.palette.primary.contrastText
  }
}));

export default function Layout({ children, title, subtitle }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  const classes = useStyles();
  const [loggedIn, setLogin] = React.useState(false);
  const handleLogin = () => {
    setLogin(true);
  };
  const handleLogout = () => {
    setLogin(false);
  };

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Link to='/'>
            <Typography component="h1" variant="h6" noWrap className={classes.appBarButton}>
              {data.site.siteMetadata.title}
            </Typography>
          </Link>
          <div className={classes.flexGrow} />
          {loggedIn ?
            <>
              <Link to='/app'>
                <IconButton className={classes.appBarButton}>
                  <DashboardIcon />
                </IconButton>
              </Link>
              <Link to='/profile'>
                <IconButton className={classes.appBarButton}>
                  <AccountCircleIcon />
                </IconButton>
              </Link>
            </>
            :
            <Link to='/login'>
              <Button className={classes.appBarButton}>
                Login
              </Button>
            </Link>
          }
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer} />
      <div style={{ margin: `3rem auto`, padding: `0 1rem` }}>
        <Typography component="h1" variant="h2" style={{ margin: '1rem', textAlign: 'center' }}>
          {title}
          {subtitle ?
            <Typography component="h1" variant="h5">
              {subtitle}
            </Typography>
            : null}
        </Typography>

        {children}
      </div>
    </div>
  );
}
