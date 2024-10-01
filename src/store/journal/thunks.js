import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEntryNote, deleteNote, noteUpdated, savingNote, setActiveNote, setNotes, setPhotosToActiveNote, setSavingNotes } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNote());

        // Obtener el ID del usuario para crear una nota en la base de datos
        // vinculada directamente a el
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imagesUrls: []
        };

        // Crear una nueva entrada (coleccion) en la BD (NO-SQL, BD basada en documentos)
        // que debe ser:
        /* 
        BASE DE DATOS JournalApp:

            id_usuario_1: {
            journal: {
                notes: [
                    nota_1_id: {
                        titulo: abc,
                        body: abc,
                        fecha: 12/12/12,
                        etc...
                    },

                    nota_2_id: {
                        titulo: abc,
                        body: abc,
                        fecha: 12/12/12,
                        etc...
                    },

                    etc...
                ],

                nro_notas: 123,
                etc...
            }        
            }

            id_usuario_2 ... , id_usuario_3 ... etc...
        */

        // Obtener la referencia en la que se desea insertar
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        const resp = await setDoc(newDoc, newNote); // Insertar

        // * IMPORTANTE: En la DB de Firebase (en el apartado de reglas)
        // se debe escribir la siguiente regla que solo permita hacer escrituras o lecturas
        // de la BD UNICAMENTE cuando el usuario este autenticado:
        // --> allow read, write: if request.auth != null; <--

        newNote.id = newDoc.id // Asignarle a la nueva nota el ID que genera automaticamente Firebase al añadir un nuevo elemento a la BD

        dispatch(addNewEntryNote(newNote));
        dispatch(setActiveNote(newNote));

    }
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        
        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));

    }
};

export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSavingNotes());

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id; // Eviar que se sobreescriba con un nuevo ID

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(noteUpdated(activeNote));

    }
};

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {

        dispatch(setSavingNotes());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload( file ));

        }

        const photosUrl = await Promise.all( fileUploadPromises );

        dispatch(setPhotosToActiveNote(photosUrl));

    }
};

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        const resp = await deleteDoc(docRef);

        dispatch(deleteNote(activeNote));

    }
};