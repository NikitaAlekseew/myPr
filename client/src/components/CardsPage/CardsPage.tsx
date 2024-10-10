// @ts-ignore
import { Box, Button, Container } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { Tour } from "../MainPage/MainPage";
import axios from "axios";
import ProductCard from "../Card/ProductCard";
import reducerTypeCard from "./reducerTypeCard";

const filterButtonStyle = {
  padding: "4px 15px",
  fontSize: "16px",
  fontWeight: "300",
  borderRadius: "10px",
  textTransform: "none",
  transition: "all 0.3s ease",
  background: "white",
  color: "#1E2D9A",
  border: "1px solid #1E2D9A",
};

const getButtonStyle = (active: boolean) => ({
  ...filterButtonStyle,
  background: active ? "#1E2D9A" : "white",
  color: active ? "white" : "#1E2D9A",
  border: `1px solid ${active ? "#1E2D9A" : "#1E2D9A"}`,
  "&:hover": {
    background: "#1E2D9A",
    color: "white",
    border: "1px solid #1E2D9A",
  },
});

import { useLocation, useParams } from "react-router-dom";


const CardsPage = () => {
const [tours, setTours] = useState<Tour[]>([]);
const [state, dispatch] = useReducer(reducerTypeCard, "ALL_TOURS");
const location = useLocation();
const busTours = tours.filter(el => el.Tour_category.title === 'Автобусная экскурсия');
const individualTours = tours.filter(el => el.Tour_category.title === "Индивидуальная экскурсия" );
const params = useParams();
console.log(params.cityTitle)
useEffect(() => {
  if(location.pathname === '/cards'){
    axios
        .get(`${import.meta.env.VITE_SERVER_URL}/tours`)
        .then((response) => setTours(response.data));
  }
  if(location.pathname.split('/')[1] === 'city'){
    axios
        .get(`${import.meta.env.VITE_SERVER_URL}/city/${params.cityTitle}`)
        .then((response) => setTours(response.data));
  }
}, [location.pathname, params.cityTitle])
console.log(tours)
  return (
    <>
    {tours.length > 0 ? 
    (<Container
      sx={{
        marginBottom: "30px",
        padding: "30px",
        background: "white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 2,
          marginBottom: "30px",
        }}
      >
        <Button
          sx={getButtonStyle(state === "ALL_TOURS")}
          onClick={() => dispatch({ type: "SHOW_ALL" })}
        >
          Все экскурсии
        </Button>

        <Button
          sx={getButtonStyle(state === "BUS_TOURS")}
          onClick={() => dispatch({ type: "SHOW_BUS_TOURS" })}
        >
          Автобусные экскурсии
        </Button>

        <Button
          sx={getButtonStyle(state === "INDIVIDUAL_TOURS")}
          onClick={() => dispatch({ type: "SHOW_INDIVIDUAL_TOURS" })}
        >
          Индивидуальные
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: 'space-evenly'
        }}
      >
        {state === "ALL_TOURS" &&
          tours.map((tour) => (
            <ProductCard
              id={tour.id}
              title={tour.title}
              schegule={tour.schegule}
              duration={tour.duration}
              start_time={tour.start_time}
              cost={tour.cost}
              Tour_category={tour.Tour_category}
              Tour_images={tour.Tour_images}
              User={tour.User}
              favoriteButtonViewNone={false}
            />
          ))}
        {state === "BUS_TOURS" &&
          busTours.map((tour) => (
            <ProductCard
              id={tour.id}
              title={tour.title}
              schegule={tour.schegule}
              duration={tour.duration}
              start_time={tour.start_time}
              cost={tour.cost}
              Tour_category={tour.Tour_category}
              Tour_images={tour.Tour_images}
              User={tour.User}
              favoriteButtonViewNone={false}
            />
          ))}
        {state === "INDIVIDUAL_TOURS" &&
          individualTours.map((tour) => (
            <ProductCard
              id={tour.id}
              title={tour.title}
              schegule={tour.schegule}
              duration={tour.duration}
              start_time={tour.start_time}
              cost={tour.cost}
              Tour_category={tour.Tour_category}
              Tour_images={tour.Tour_images}
              User={tour.User}
              favoriteButtonViewNone={false}
            />
          ))}
      </Box>
    </Container>) :
    (<Container>
      <Box>
        <span> Туры не найдены</span>
      </Box>
    </Container>)
      }
      </>
  );
};

export default CardsPage;
