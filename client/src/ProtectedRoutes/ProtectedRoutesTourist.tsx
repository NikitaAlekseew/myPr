// @ts-ignore
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../features/auth/authSlice';
import {Outlet, Navigate} from 'react-router-dom'



function ProtectedRoutesTourist(): JSX.Element {
    const user = useSelector(selectCurrentUser);
    const role = user?.role_id === 2 ? true : false;
    return (
        role ? <Outlet /> : <Navigate to='/'/>
    );
}
 
export default ProtectedRoutesTourist;