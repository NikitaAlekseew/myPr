// @ts-ignore
import UserPage from "./UserPage/UserPage";
// import GuidePage from "./GuidePage/GuidePage";
// import AdminPage from "./AdminPage/AdminPage";
import { useLocation, Outlet } from "react-router-dom";

const Cabinet = () => {
  const location = useLocation();
  const hideCabinetPaths = [
    "/myCabinet/about",
    "/myCabinet/customTour",
    "/myCabinet/newTour",
    "/myCabinet/newBlog",
  ];
  const shouldHideCabinet = hideCabinetPaths.includes(location.pathname);
  return (
    <>
      {!shouldHideCabinet && <UserPage />}
      <Outlet />
    </>
  );
};

export default Cabinet;
