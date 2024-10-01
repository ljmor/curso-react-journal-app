import React, { useMemo, useState } from 'react';
import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingWithEmail } from '../../store/auth/thunks';


const formBase = {
    name: '',
    email: '',
    password: ''
}

const formValidations = {
    email: value => value.includes('@'),
    password: value => value.length >= 6,
    name: value => value.length >= 1,
}

export const RegisterPage = () => {

    const {
        name,
        email,
        password,
        formState,
        onInputChange,
        emailValid,
        passwordValid,
        nameValid

    } = useForm(formBase, formValidations);

    const { errorMessage, status } = useSelector(state => state.auth);
    const isChekingAuth = useMemo(() => status === 'checking');

    const [formSubmited, setFormSubmited] = useState(false);
    const isAllFormValidated = emailValid && passwordValid && nameValid;
    const dispatch = useDispatch();

    const onSubmitForm = (event) => {
        event.preventDefault();
        setFormSubmited(true);

        if (!isAllFormValidated) return;
        dispatch(startCreatingWithEmail(formState));
        console.log(formState);
    };

    return (

        <AuthLayout title='Register'>

            <form onSubmit={onSubmitForm}>
                <Grid2 container spacing={2} sx={{ marginTop: 2 }}>

                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            label="Full name"
                            type="text"
                            placeholder="Ej. Luis Mora"
                            name="name"
                            onChange={onInputChange}
                            value={name}
                            fullWidth
                            error={(!nameValid && formSubmited) && true}
                            helperText={(!nameValid && formSubmited) ? "Name is a required field" : ""}

                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="youremail@email.com"
                            name="email"
                            onChange={onInputChange}
                            value={email}
                            fullWidth
                            error={(!emailValid && formSubmited) && true}
                            helperText={(!emailValid && formSubmited) ? "The email needs to have an @" : ""}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            onChange={onInputChange}
                            value={password}
                            fullWidth
                            error={(!passwordValid && formSubmited) && true}
                            helperText={(!passwordValid && formSubmited) ? "Password length needs to be higher than 6" : ""}
                        />
                    </Grid2>

                    <Grid2 container spacing={2} sx={{ marginBottom: 1, marginTop: 2 }} size={{ xs: 12 }}>

                        <Grid2 size={{ xs: 12 }} display={ (errorMessage === null || errorMessage === undefined) ? 'none' : '' } >
                            <Alert severity='error'>
                                { errorMessage }
                            </Alert>
                        </Grid2>

                        <Grid2 size={{ xs: 12 }}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                disabled={(formSubmited && !isAllFormValidated) || isChekingAuth}
                            >
                                Create Account
                            </Button>
                        </Grid2>

                    </Grid2>

                    <Grid2 container direction="row" size={{ xs: 12 }} justifyContent="start">
                        <Typography>Do you have an account?</Typography>
                        <Link component={RouterLink} to="/auth/login">
                            Access now
                        </Link>
                    </Grid2>

                </Grid2>
            </form>

        </AuthLayout>


    )
}