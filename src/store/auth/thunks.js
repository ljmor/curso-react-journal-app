import { loginWithEmail, logoutFirebase, registerWithEmail, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogOut } from "../journal/journalSlice";
import { checkCredentials, login, logout } from "./authSlice"

export const checkingAuth = (email, password) => {

    return async (dispatch) => {

        dispatch(checkCredentials());


    }
};

export const startGoogleSignIn = () => {

    return async (dispatch) => {

        dispatch(checkCredentials());

        const result = await signInWithGoogle();

        // Si hay un error
        if (!result.ok) return dispatch(logout(result.errorMessage));

        // Si todo sale bien
        dispatch(login(result));

    }
};

export const startCreatingWithEmail = ({ email, password, name }) => {

    return async (dispatch) => {

        dispatch(checkCredentials());

        const result = await registerWithEmail({ email, password, name });

        // Si hay un error
        if (!result.ok) return dispatch(logout(result.errorMessage));

        // Si todo sale bien
        dispatch(login(result));

    }
};

export const startLoginWithEmail = ({ email, password }) => {

    return async (dispatch) => {

        dispatch(checkCredentials());

        const result = await loginWithEmail(email, password);

        // Si hay un error
        if (!result.ok) return dispatch(logout(result.errorMessage));

        // Si todo sale bien
        dispatch(login(result));
    }

};


export const startLogout = () => {

    return async (dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogOut());
        dispatch(logout());

    }
};