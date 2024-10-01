import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async ( uid = '' ) => {

    // Ruta a la coleccion que nos interesa (las notas)
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef); // Traer todas las notas del usuario

    const notes = [];
    docs.forEach(doc => {
        // Añadir las notas ( con todos sus campos ) con su respectivo ID propio
        notes.push({ id: doc.id, ...doc.data() })
    });

    return notes;
};