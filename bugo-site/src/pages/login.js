import React from 'react';
import Layout from '../components/Layout';
import { Box, Input, makeStyles, Paper, TextField } from '@material-ui/core';
import { Button } from 'gatsby-theme-material-ui';
import { navigate, useStaticQuery } from 'gatsby';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    flexGrow: {
        flexGrow: 1
    },
    appBarButton: {
        color: theme.palette.primary.contrastText
    },
    formField: {
        margin: theme.spacing(1)
    }
}));

export default function LoginPage() {
    const classes = useStyles();
    
    const handleLogin = () => {
        const form = new FormData(document.getElementById('login-form'));
        fetch(
            "/api/token/auth",
            {method: 'POST', body: form}
        ).then((response) => {
            alert(response)
            navigate('/app')
        }, (error) => {
            alert(error)
        })
    }

    return (
        <Layout title="Login">
            <Box textAlign='center'>
                <form id='login-form'>
                    <Box>
                        <TextField id='username' type='text' name='username' label="Username" className={classes.formField} />
                        <TextField id='password' type='password' name='password' label="Password" className={classes.formField} />   
                    </Box>
                    <Box>
                        <Button onClick={handleLogin} className={classes.formField}>Login</Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
}
