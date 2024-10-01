import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // Mantener la informacion del usuario que inicio sesión la ultima vez (No importa si se recarga la pagina)
    useEffect(() => {

        // Funcion de firebase para obtener el ultimo login hecho en la app
        onAuthStateChanged(FirebaseAuth, async (user) => {
            // Si no hay un usuario autenticado
            if (!user) return dispatch(logout());

            // En caso de que haya un user autenticado
            const { uid, displayName, email, photoURL } = user;
            dispatch(login({ uid, displayName, email, photoUrl: photoURL }));
            dispatch(startLoadingNotes());
        });

    }, [])

    return status;

}
