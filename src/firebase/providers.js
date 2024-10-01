import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

// Proveedor con el que aparecerá el popup de autenticacion con google
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {
        // PopUp para autenticacion con las credenciales del usuario
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const user = result.user;

        const { displayName, email, photoURL, uid } = user;

        // Devolver los valores
        return {
            ok: true,
            // User info
            photoUrl: photoURL,
            displayName,
            email,
            uid
        }

        // Valores de la autenticacion como tokens
        // const credentials = GoogleAuthProvider.credentialFromResult(result); 
        // console.log(credentials)s

    } catch (error) {

        const errorCode = error.errorCode;
        const errorMessage = error.message;

        console.log(error)

        // Devolver los mensajes de error
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}


// Proveedor con el que se autenticará el usuario mediante user y contraseña
export const registerWithEmail = async ({ email, password, name }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        updateProfile(FirebaseAuth.currentUser, { displayName: name });

        return {
            ok: true,
            displayName: name,
            photoUrl: photoURL,
            uid,
            email
        }

    } catch (error) {

        let errorMessage = '';

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Error: The email is already registered';
                break;

            default:
                errorMessage = error.message;
                break;
        }

        return {
            ok: false,
            errorMessage: errorMessage
        }
    }

};

export const loginWithEmail = async (mail, password) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, mail, password);
        const { displayName, email, photoURL, uid } = resp.user;

        return {
            ok: true,
            photoUrl: photoURL,
            displayName,
            email,
            uid
        }


    } catch (error) {

        let errorMessage = '';

        switch (error.message) {
            case 'Firebase: Error (auth/invalid-email).':
                errorMessage = "Error: This user doesn't exists";
                break;

            case 'Firebase: Error (auth/invalid-credential).':
                errorMessage = 'Error: Email or password incorrect';
                break;

            case "Cannot access 'email' before initialization":
                errorMessage = "Error: This user doesn't exists";
                break;

            case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
                errorMessage = "Error: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
                break;

            case "Firebase: Error (auth/network-request-failed).":
                errorMessage = "Error: No internet conection";
                break;

            default:
                errorMessage = error.message;
                break;
        }

        return {
            ok: false,
            errorMessage: errorMessage
        }
    }
};

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();

};