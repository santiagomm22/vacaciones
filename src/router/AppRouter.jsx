import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/loginPages/LoginPage"
import { CalendarPage } from "../calendar/pages/CalendarPage"

export const AppRouter = () => {
    const authStatus = 'logueado'; //logueado //no esta logueado
  return (
    <Routes>
        {
            (authStatus === 'no esta logueado')
            ? <Route path="/auth/*" element={ <LoginPage/> }/>
            : <Route path="/*" element={ <CalendarPage/> }/>
        }
        <Route path="/*" element={ <Navigate to={'/auth/login'}/> }/>

    </Routes>
  )
}
