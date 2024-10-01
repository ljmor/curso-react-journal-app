import { Grid2, Typography } from "@mui/material"

export const AuthLayout = ({ children, title='' }) => {
    return (
        <Grid2
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid2
                className="box_shadow animate__animated animate__fadeInDown"
                size={{
                    xs: 12,
                    sm: 8,
                    md: 6
                }}
                sx={{
                    background: 'white',
                    padding: 3,
                    borderRadius: 2,
                    maxWidth: '500px'
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 1 }}>{title}</Typography>
            
                {/* Children */}
                { children }
            
            </Grid2>

        </Grid2>
    )
}
