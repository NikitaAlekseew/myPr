// @ts-ignore
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../features/auth/authSlice';
import {Outlet, Navigate} from 'react-router-dom'



function ProtectedRoutesGuide(): JSX.Element {
    const user = useSelector(selectCurrentUser);
    const role = user?.role_id === 1 ? true : false;
    return (
        role ? <Outlet /> : <Navigate to='/'/>
    );
}
 
export default ProtectedRoutesGuide;