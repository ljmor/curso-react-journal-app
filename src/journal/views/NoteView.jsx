import { BorderStyleSharp, DeleteSharp, SaveOutlined, UploadOutlined, UploadSharp } from "@mui/icons-material"
import { Button, Grid2, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef, useState } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const dispatch = useDispatch();
    const { activeNote, savedMessage, isSaving } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState } = useForm(activeNote);

    const fileInputRef = useRef();

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();

    }, [date])

    const onSaveNote = () => {
        dispatch(setActiveNote(formState));
        dispatch(startSavingNote());
        setHasNewImages(false);
    };

    const onDeleteNote = () => {
        dispatch(startDeletingNote());
        Swal.fire('Note Deleted', '', 'success');
    }

    const [hasNewImages, setHasNewImages] = useState(false);
    const onFileInputChange = (event) => {
        if (event.target.files === 0) return;

        dispatch(startUploadingFiles(event.target.files));
        setHasNewImages(true);
    };

    useEffect(() => {
        if (savedMessage.length > 0 && savedMessage.includes('updated')) {
            Swal.fire('Note Updated', savedMessage, 'success');
        }

    }, [savedMessage]);

    const hasUnsavedChanges = useMemo(() => {
        return hasNewImages || activeNote.title !== title || activeNote.body !== body;
    }, [hasNewImages, activeNote.title, activeNote.body, title, body]);


    return (
        <Grid2
            container
            className='animate__animated animate__backInDown'
            direction='row'
            justifyContent='space-between'
            sx={{ marginBottom: 1 }}
            alignItems='center'
            spacing={2}
        >

            <Grid2>
                <Typography
                    fontSize={39}
                    fontWeight='light'
                >
                    {dateString}
                </Typography>
            </Grid2>

            <Grid2 container spacing={1} sx={{ alignItems:'center' }} size={{ xs:12 }}>

                {hasUnsavedChanges && (
                    <Typography
                        color="error"
                        variant="caption"
                        sx={{ fontSize:15, }}
                    >
                        Changes not saved
                    </Typography>
                )}

                <input
                    type='file'
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef}

                />

                <IconButton
                    color="primary"
                    disabled={ isSaving || (title === '' && body === '' ) }
                    sx={{ left:0 }}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadSharp />
                </IconButton>

                <IconButton
                    color='error'
                    onClick={onDeleteNote}
                    disabled={ (title === '' && body === '') || (activeNote.title === '' && activeNote.body === '') }
                >
                    <DeleteSharp/>
                </IconButton>

                <Button
                    color='primary' sx={{ pl: 1.6, pr: 1.6, pb: 1, pt: 1, ml:1 }}
                    variant='outlined'
                    disabled={!hasNewImages && activeNote.title === title && activeNote.body === body}
                    onClick={onSaveNote}
                >
                    <SaveOutlined sx={{ fontSize: 20, marginRight: 1 }} />
                    <Typography fontSize={12}>Save</Typography>
                </Button>

            </Grid2>

            <Grid2 container size={{ xs: 12 }}>

                <TextField
                    type='text'
                    variant='outlined'
                    placeholder='Type a title'
                    label='Title'
                    sx={{ border: 'none', marginBottom: 1 }}
                    fullWidth
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type='text'
                    variant='filled'
                    placeholder='Write a note'
                    label='What happens today?'
                    sx={{ border: 'none', marginBottom: 1 }}
                    fullWidth
                    multiline
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />

            </Grid2>

            {/* Galeria de imgs */}
            <ImageGallery imgs={ activeNote.imagesUrls } />

        </Grid2>
    )
}
