import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#9575CD',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#616161'
        }
    },
    status: {
      danger: 'orange',
    },
  });

  export default theme;
