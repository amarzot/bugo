import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useAuth } from "./context/auth";
import AuthenticatedApp from "./AuthenticatedApp";
import LoginForm from './components/LoginForm';

function UnauthenticatedApp() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v5-alpha example
        </Typography>
      </Box>
      <Box>
        <Typography>
          Unauthenticated!
        </Typography>
      </Box>
      <LoginForm />
    </Container>
  );
}

function App() {
  return useAuth().authState.user? <AuthenticatedApp/> : <UnauthenticatedApp />
}

export default App;
