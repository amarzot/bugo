import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useAuth } from "./context/auth";
import { Button } from '@material-ui/core';

function AuthenticatedApp() {

    const auth = useAuth()

    const handleLogout = () => {
        auth.logout()
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                            Create React App v5-alpha example
                </Typography>
            </Box>
            <Box>
                <Typography>
                    Authenticated! auth data is {JSON.stringify(auth.authState)}
                </Typography>
            </Box>
            <Button onClick={handleLogout}>Logout</Button>
        </Container>
    );
}

export default AuthenticatedApp