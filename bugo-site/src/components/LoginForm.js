import React from 'react';
import { useAuth } from "../context/auth";
import { Button, TextField, Snackbar, Alert, AlertTitle, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    form: {
        textAlign: 'center'
    },
    formField: {
        margin: theme.spacing(1),
    },
}));

function LoginForm() {
    const auth = useAuth();
    const classes = useStyles();

    const [loginError, setLoginError] = React.useState('')
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)

    const [formValues, updateFormValues] = React.useReducer(
        (oldState, newState) => ({ ...oldState, ...newState }),
        { username: '', password: '' }
    )

    const handleChange = (event) => {
        const newValue = {}
        newValue[event.target.name] = event.target.value
        updateFormValues(newValue);
    }

    const handleLogin = () => {
        auth.login(formValues)
            .catch(
                error => {
                    console.error(error)
                    if (error instanceof Error)
                        setLoginError(error.message)
                    else
                        setLoginError(error.msg)
                    setSnackbarOpen(true)
                }
            )
    }

    const finalForm = (
        <>
            <form className={classes.form}>
                <div>
                    <TextField className={classes.formField} id='username' type='text' name='username' label="Username" value={formValues.username} onChange={handleChange} />
                    <TextField className={classes.formField} id='password' type='password' name='password' label="Password" value={formValues.password} onChange={handleChange} />
                </div>
                <div>
                    <Button className={classes.formField} onClick={handleLogin} type='button'>Login</Button>
                </div>
            </form>
            <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
                    <AlertTitle>Login Error</AlertTitle>
                    {loginError}
                </Alert>
            </Snackbar>
        </>
    )
    return finalForm
}

export default LoginForm