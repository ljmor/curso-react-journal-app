import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { ChekingAuth } from "../ui"
import { useCheckAuth } from "../hooks"

export const AppRouter = () => {

    // Mantener el estado de el ultimo inicio de sesion
    const status = useCheckAuth();
    
    // Mostrar un loading mientras la app este en estado de checking de la autenticacion
    if (status === 'checking') {
        return <ChekingAuth/>
    }

    return (
        <Routes>
            {
                // SOLO Si esta autenticado el usuario tiene acceso a la app, caso contrario SOLO tiene acceso al login
                ( status === 'auth' ) 
                ? <Route path="/*" element={ <JournalRoutes/> }/> 
                : <Route path="auth/*" element={ <AuthRoutes/> }/> 
            }
            <Route />

            {/* Cualquier otra ruta que ingrese el usuario SIEMPRE lo conducira al Login */}
            <Route path="/*" element={ <Navigate to='/auth/login' /> } />

        </Routes>
    )
}
