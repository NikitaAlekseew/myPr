// @ts-ignore
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../features/auth/authSlice';
import {Outlet, Navigate} from 'react-router-dom'



function ProtectedRoutesIsAuth(): JSX.Element {
    const user = useSelector(selectCurrentUser);
    console.log(user)
    const isAuth = user?.isActivated ?? false;
    console.log(isAuth  )
    return (
         isAuth ? <Outlet /> : <Navigate to='/'/>
    );
}
 
export default ProtectedRoutesIsAuth;