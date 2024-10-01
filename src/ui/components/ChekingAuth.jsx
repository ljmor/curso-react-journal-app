import { CircularProgress, Grid2 } from "@mui/material"

export const ChekingAuth = () => {
    return (
        <Grid2
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid2 sx={{maxWidth: '500px'}}>
                <CircularProgress color='warning'/>
            </Grid2>

        </Grid2>
    )
}
