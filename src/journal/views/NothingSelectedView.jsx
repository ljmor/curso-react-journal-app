import { StarOutline } from "@mui/icons-material"
import { Grid2, Typography } from "@mui/material"

export const NothingSelectedView = () => {
    return (
        <Grid2
            className="animate__animated animate__fadeIn"
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius:5 }}
        >

            <Grid2>
                <StarOutline sx={{ fontSize:100, color:'white' }}/>
            </Grid2>

            <Grid2>
                <Typography
                    color='white'
                    variant='h5'
                >
                    Select or create an entry
                </Typography>
            </Grid2>

        </Grid2>
    )
}
