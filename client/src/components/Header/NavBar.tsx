// @ts-ignore
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Container,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { User, selectCurrentUser, logOut } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";

import { useDrawer } from "../Context/DrawerContext";
import MobileMenu from "./MobileMenu";
import MainButton from "../UI/MainButton";

import { IoExitOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";

import SearchField from "../UI/SearchField";


import { PiUserCircleCheckLight } from "react-icons/pi";

export const underlineButtonStyle = {
  position: "relative",
  backgroundColor: "#ffffffff",
  border: "none",
  color: "#707070",
  fontWeight: "400",
  cursor: "pointer",
  padding: "0 2px",
  outline: "none",
  textDecoration: "none",
  textTransform: "none",

  "&:hover": {
    color: "#000000",
    backgroundColor: "#ffffffff",
  },

  "&:after": {
    content: '""',
    position: "absolute",
    bottom: "-3px",
    left: "0",
    width: "0%",
    height: "1px",
    backgroundColor: "#707070",
    transition: "width 0.3s ease-out",
  },

  "&:hover:after": {
    width: "100%",
  },
};

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser) as User | null;

  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [logout] = useLogoutMutation();
  const { setOpenLoginDrawer } = useDrawer();

  const isAuth = user?.isActivated ?? false;

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(logOut());
      navigate("/");
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  const handleLoginOpen = () => {
    setOpenLoginDrawer(true);
  };

  const pages = isAuth
    ? [
        {
          name: "Выйти",
          path: "/",
          onClick: handleLogout,
          icon: <IoExitOutline />,
        },
      ]
    : [
        { name: "Регистрация", path: "/register", icon: <IoCreateOutline /> },
        {
          name: "Вход",
          path: "#",
          onClick: handleLoginOpen,
          icon: <IoLogInOutline />,
        },
      ];

  const guideMenu = (() => {
    switch (location.pathname) {
      case "/guide/new/tour":
        return [
          { name: "Главная", path: "/" },
          { name: "Личный кабинет", path: "/guide" },
          { name: "Создать статью", path: "/guide/new/post" },
          // { name: "Обо мне", path: "/guide/about" },
        ];
      case "/guide/new/post":
        return [
          { name: "Главная", path: "/" },
          { name: "Личный кабинет", path: "/guide" },
          { name: "Создать тур", path: "/guide/new/tour" },
          // { name: "Обо мне", path: "/guide/about" },
        ];
      case "/guide":
        return [
          { name: "Главная", path: "/" },
          //{ name: "Мои туры", path: "/guide" },
          { name: "Создать тур", path: "/guide/new/tour" },
          { name: "Создать статью", path: "/guide/new/post" },
        ];
      default:
        return [
          // { name: "Главная", path: "/" },
          { name: "Личный кабинет", path: "/guide" },
          { name: "Создать тур", path: "/guide/new/tour" },
          { name: "Создать статью", path: "/guide/new/post" },
          // { name: "Обо мне", path: "/guide/about" },
        ];
    }
  })();

  const touristMenu = (() => {
    switch (location.pathname) {
      case "/myCabinet":
        return [
          { name: "Главная", path: "/" },
          { name: "Создать свой тур", path: "/myCabinet/customTour" },
          { name: "Все туры", path: "/cards" },
          { name: "Блог", path: "/blog" },
        ];
      case "/cards":
        return [
          { name: "Главная", path: "/" },
          { name: "Личный кабинет", path: "/myCabinet" },
          { name: "Блог", path: "/blog" },
        ];
      case "/blog":
        return [
          { name: "Главная", path: "/" },
          { name: "Личный кабинет", path: "/myCabinet" },
          { name: "Все туры", path: "/cards" },
        ];
      case "/myCabinet/customTour":
        return [
          { name: "Главная", path: "/" },
          { name: "Личный кабинет", path: "/myCabinet" },
          { name: "Все туры", path: "/cards" },
          { name: "Блог", path: "/blog" },
        ];
      case "/":
        return [
          { name: "Личный кабинет", path: "/myCabinet" },
          { name: "Все туры", path: "/cards" },
          { name: "Блог", path: "/blog" },
        ];
      default:
        return [
          { name: "Главная", path: "/" },
          { name: "Личный кабинет", path: "/myCabinet" },
          { name: "Все туры", path: "/cards" },
          { name: "Блог", path: "/blog" },
        ];
    }
  })();

  return (
    <AppBar
      position="sticky"
      sx={{
        width: "1220px",
        margin: "0 auto",
        mb: "20px",

        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        background: "white",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          paddingY: 2,
          color: "#2e2e2e",
        }}
      >
        <Typography variant="h5" component="p">
          {isAuth ? (
            <PiUserCircleCheckLight
              style={{ color: "#707070", fontSize: "40px" }}
            />
          ) : (
            "TOUR LEADER"
          )}
        </Typography>
        {!user?.role_id && <SearchField />}
        {isAuth && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {user?.role_id === 1 ? (
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
                {guideMenu?.map((menu) => (
                  <Button
                    sx={underlineButtonStyle}
                    variant="text"
                    key={menu.name}
                    onClick={() => navigate(menu.path)}
                  >
                    {menu.name}
                  </Button>
                ))}
              </Box>
            ) : (
              <>
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
                  {touristMenu?.map((menu) => (
                    <Button
                      sx={underlineButtonStyle}
                      variant="text"
                      key={menu.name}
                      onClick={() => navigate(menu.path)}
                    >
                      {menu.name}
                    </Button>
                  ))}
                </Box>
              </>
            )}
          </Box>
        )}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {/* {user?.role_id === 2 ? <MenuList /> : null} */}
          {pages.map((page) => (
            <MainButton
              variant="outlined"
              key={page.name}
              name={page.name}
              path={page.path}
              icon={page.icon}
              onClick={page.onClick}
            />
          ))}
        </Box>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={() => setMobileMenuOpen(true)}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Container>
      <MobileMenu
        pages={pages}
        menuOpen={mobileMenuOpen}
        menuClose={() => setMobileMenuOpen(false)}
      />
    </AppBar>
  );
};

export default NavBar;
