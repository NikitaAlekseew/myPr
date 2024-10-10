import { Outlet, useLocation } from "react-router-dom";

const BlogsPage = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname === '/blogs' &&  
                <div>Страница со всеми блогами</div>
            }
            <Outlet />
        </>
    );
}
 
export default BlogsPage;