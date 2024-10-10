import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import store, { initAuthState } from "./app/store";
import NavBar from "./components/Header/NavBar";
import ProtectedRoutesTourist from "./ProtectedRoutes/ProtectedRoutesTourist";
import ProtectedRoutesGuide from "./ProtectedRoutes/ProtectedRoutesGuide";
import ProtectedRoutesIsAuth from "./ProtectedRoutes/ProtectedRoutesIsAuth";
import MainPage from "./components/MainPage/MainPage";

import RegisterPage from "./components/RegisterPage/RegisterPage";

import Cabinet from "./components/Cabinet/Cabinet";
import AboutPage from "./components/Cabinet/AboutPage/AboutPage";
import CustomTour from "./components/Cabinet/CustomTour/CreateCustomTour";

import BlogsPage from "./components/Blog/BlogsPage/BlogsPage";
import OneBlogsPage from "./components/Blog/OneBlogsPage/OneBlogsPage";

import { DrawerProvider } from "./components/Context/DrawerContext";
import RegisterDrawer from "./components/Common/RegisterDrawer";
import TourCreationForm from "./components/GuidePage/TourCreationForm/TourCreationForm";
import GuidePage from "./components/GuidePage/GuidePage";
import NotFoundPage from "./components/NotFoundPage";
import { useState, useEffect } from "react";
import { CircularProgress, Stack } from "@mui/material";
import CardDetail from "./components/Card/CardDetail";
import CardsPage from "./components/CardsPage/CardsPage";

const theme = createTheme({
  typography: {
    fontFamily: "Geologica, Arial, sans-serif",
  },
});

function App() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await initAuthState();
      setIsAuthLoading(false);
    };

    initializeAuth();
  }, []);

  if (isAuthLoading) {
    return (
      <>
        <Stack spacing={2}>
          <CircularProgress color="success" />
        </Stack>
        <div>Loading....</div>
      </>
    );
  }
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DrawerProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route element={<NotFoundPage />} path="*" />
              <Route element={<MainPage />} path="/" />
              <Route element={<CardsPage />} path="/cards" />
              <Route element={<CardsPage />} path="/city/:cityTitle"/>
              <Route element={<RegisterPage />} path="/register" />
              <Route element={<CardDetail />} path="/tour/:id"/>
              <Route element={<ProtectedRoutesIsAuth />}>
                <Route element={<ProtectedRoutesTourist />}>
                  <Route element={<Cabinet />} path="/myCabinet">
                    <Route element={<AboutPage />} path="about" />
                    <Route element={<CustomTour />} path="customTour" />
                  </Route>
                </Route>
                <Route element={<ProtectedRoutesGuide />}>
                  <Route element={<GuidePage />} path="/guide">
                    <Route element={<TourCreationForm />} path="new/tour" />
                    <Route
                      element={<TourCreationForm />}
                      path="edit/tour/:id"
                    />
                  </Route>
                </Route>
              </Route>
              <Route element={<BlogsPage />} path="/blogs">
                <Route element={<OneBlogsPage />} path=":id" />
              </Route>
              <Route path="/card/:id" element={<CardDetail />} />
              <Route element={<GuidePage />} path="/guide">
                <Route element={<TourCreationForm />} path="new/tour" />
                <Route element={<TourCreationForm />} path="edit/tour/:id" />
              </Route>
              <Route element={<NotFoundPage />} path="*" />
            </Routes>
            <RegisterDrawer />
          </BrowserRouter>
        </DrawerProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
