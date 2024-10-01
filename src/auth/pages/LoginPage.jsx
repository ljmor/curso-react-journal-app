import React, { useMemo } from 'react';
import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material";
import { Google } from '@mui/icons-material';
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { checkingAuth, startGoogleSignIn, startLoginWithEmail } from '../../store/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';

const formData = {
    email: '',
    password: ''
};

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const { email, password, onInputChange, formState } = useForm(formData);

    const isAuth = useMemo( () => status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(startLoginWithEmail(formState));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (

        <AuthLayout title='Login'>
            
            <form onSubmit={onSubmit}>
                <Grid2 container spacing={2} sx={{ marginTop: 2 }}>

                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="youremail@email.com"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            fullWidth
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            fullWidth
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12 }} display={ (errorMessage === null || errorMessage === undefined ) ? 'none' : '' } >
                        <Alert severity='warning'>
                            { errorMessage }
                        </Alert>
                    </Grid2>

                    <Grid2 container spacing={2} sx={{ marginBottom: 1, marginTop: 2 }} size={{ xs: 12 }}>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <Button 
                                type='submit'
                                variant='contained' 
                                fullWidth
                                disabled={ isAuth  }
                            >
                                Login
                            </Button>
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <Button 
                                onClick={onGoogleSignIn}
                                variant='contained' 
                                fullWidth
                                disabled={ isAuth }
                            >
                                <Google fontSize='small' />
                                <Typography sx={{ marginLeft: 1, fontWeight: 'bold', textTransform: 'capitalize' }} >Google</Typography>
                            </Button>
                        </Grid2>
                    </Grid2>

                    <Grid2 container direction="row" size={{ xs: 12 }} justifyContent="center">
                        <Link component={RouterLink} to="/auth/register">
                            Create an Account
                        </Link>
                    </Grid2>

                </Grid2>
            </form>

        </AuthLayout>


    )
}