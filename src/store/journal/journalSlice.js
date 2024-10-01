import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        activeNote: null

        // Asi se debe ver una nota
        /* activeNote: {
            id: 123,
            title: '',
            body: '',
            date: 132,
            imagesUrls: []
        } */
    },
    reducers: {
        savingNote: (state) => {
            state.isSaving = true;

        },

        addNewEntryNote: (state, { payload }) => {
            state.notes.push(payload);
            state.isSaving = false;

        },

        setActiveNote: (state, { payload }) => {
            state.activeNote = payload;
            state.savedMessage = '';

        },

        setNotes: (state, { payload }) => {
            state.notes = payload;
        },

        setSavingNotes: (state, { payload }) => {
            state.isSaving = true;
            state.savedMessage = '';

        },

        noteUpdated: (state, { payload }) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {

                if (note.id === payload.id) {
                    return payload;
                }

                return note;
            });

            state.savedMessage = `¡${payload.title} updated succesfully!`;
        },

        setPhotosToActiveNote: (state, { payload }) => {
            if (state.activeNote) {
                state.activeNote.imagesUrls = [
                    ...(state.activeNote.imagesUrls || []),
                    ...(Array.isArray(payload) ? payload : [payload])
                ];
            }
            state.isSaving = false;
        },

        clearNotesLogOut: (state) => {
            state.isSaving = false;
            state.savedMessage = '';
            state.notes = [];
            state.activeNote = null;
        },

        deleteNote: (state, { payload }) => {
            state.isSaving = false;
            state.activeNote = null;
            state.notes = state.notes.filter(note => note.id !== payload.id);
        },
    }
});


export const {
    savingNote,
    addNewEntryNote,
    setActiveNote,
    setNotes,
    setSavingNotes,
    noteUpdated,
    setPhotosToActiveNote,
    clearNotesLogOut,
    deleteNote
} = journalSlice.actions;