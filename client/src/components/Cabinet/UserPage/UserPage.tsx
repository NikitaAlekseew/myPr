// @ts-ignore
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import EmblaCarousel from "../../Slider/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "../../Slider/Embla.css";
import axios from "axios";
import { Tour } from "../../MainPage/MainPage";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import reducerShowTour from "./reducerShowTour";
import { underlineButtonStyle } from "../../Header/NavBar";
import { useNavigate } from "react-router-dom";
import CustomTour from "../CustomTour/CustomTour";

import { LuPlusCircle } from "react-icons/lu";

import "./UserPage.scss";
import { ContactsRounded } from "@mui/icons-material";

//* Настройки слайдера
const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
const SLIDE_COUNT = 2;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const UserPage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  const [favoriteTour, setfavoriteTour] = useState<Tour[]>([]);

  const [bookingTours, setBookingTours] = useState<Tour[]>([]);
  const [state, dispatch] = useReducer(reducerShowTour, "ACTIVE_ORDERS");
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/tours`)
      .then((response) => setTours(response.data));
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/booking/${user?.id}`)
      .then((response) => setBookingTours(response.data));
  }, [user?.id]);
  const activeBookingTours = bookingTours.filter((el) => new Date(el?.date).getTime() >= new Date().getTime());
  const pastBookingTours = bookingTours.filter((el) => new Date(el?.date).getTime() < new Date().getTime());

  useEffect(() => {
    const favoriteArrayId = JSON.parse(localStorage.getItem("favourite"));
    const favoriteCards = tours.filter((tour) =>
      favoriteArrayId.some(
        (favoriteArrayIdObj: { tour_id: number }) =>
          favoriteArrayIdObj.tour_id === tour.id
      )
    );
    setfavoriteTour(favoriteCards);
  }, [tours]);

  const getButtonStyle = (buttonType: string) => ({
    position: "relative",
    backgroundColor: "#ffffffff",
    border: "none",
    color: state === buttonType ? "#000000" : "#707070",
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
      left: "50%",
      width: state === buttonType ? "100%" : "0%",
      height: "2px",
      backgroundColor: "#707070",
      transition: "width 0.3s ease-out, left 0.3s ease-out",
      transform: "translateX(-50%)",
      transformOrigin: "center",
    },

    "&:hover:after": {
      width: "100%",
      left: "50%",
    },
  });

  return (
    <>
      <Container
        sx={{
          marginBottom: "30px",
          padding: "30px",
          background: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
          borderRadius: "15px",
        }}
      >
        <Typography variant="h3" marginBottom={"30px"}>
          Мои бронирования
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: "20px",
            }}
          >
            <Button
              sx={getButtonStyle("ACTIVE_ORDERS")}
              variant="text"
              onClick={() => dispatch({ type: "SHOW_ACTIVE_ORDERS" })}
            >
              Активные заказы
            </Button>
            <Button
              sx={getButtonStyle("PAST_ORDERS")}
              variant="text"
              onClick={() => dispatch({ type: "SHOW_PAST_ORDERS" })}
            >
              Прошедшие заказы
            </Button>
            <Button
              sx={getButtonStyle("FAVORITES")}
              variant="text"
              onClick={() => dispatch({ type: "SHOW_FAVORITES" })}
            >
              Избранное
            </Button>
          </Box>
          <Button
            variant="text"
            onClick={() => navigate("/tours")}
            sx={{
              textTransform: "none",
              background: "#F9F9F9",
              color: "#000000",
              fontWeight: "300",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              paddingX: "15px",
              "&:hover": {
                backgroundColor: "#F9F9F9",
              },
            }}
          >
            Добавить заказ
            <LuPlusCircle style={{ fontSize: "14px", marginLeft: "5px" }} />
          </Button>
        </Box>
        {state === "ACTIVE_ORDERS" &&
          (activeBookingTours.length > 0 ? (
            <EmblaCarousel
              slides={SLIDES}
              options={OPTIONS}
              tours={activeBookingTours}
              setTours={setTours}
              favoriteButtonViewNone={true}
            />
          ) : (
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Активных заказов нет
            </Typography>
          ))}
        {state === "PAST_ORDERS" &&
          (pastBookingTours.length > 0 ? (
            <EmblaCarousel
              slides={SLIDES}
              options={OPTIONS}
              tours={pastBookingTours}
              setTours={setTours}
              favoriteButtonViewNone={true}
            />
          ) : (
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Прошедших заказов нет
            </Typography>
          ))}
        {state === "FAVORITES" &&
          (favoriteTour.length > 0 ? (
            <EmblaCarousel
              slides={SLIDES}
              options={OPTIONS}
              //   favoriteButtonViewNone={false}
              tours={favoriteTour}
              setTours={setfavoriteTour}
              favoriteButtonViewNone={false}
            />
          ) : (
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              У вас нет избранных туров
            </Typography>
          ))}
      </Container>
      <Container
        sx={{
          marginBottom: "30px",
          padding: "30px",
          background: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
          borderRadius: "15px",
        }}
      >
        <CustomTour />
      </Container>
    </>
  );
};

export default UserPage;
