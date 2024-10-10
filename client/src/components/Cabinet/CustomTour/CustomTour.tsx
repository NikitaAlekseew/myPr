// @ts-ignore
import { useSelector } from "react-redux";
import { selectCurrentUser, User } from "../../../features/auth/authSlice";
import {
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import style from "./Customtour.module.scss";
import MapComponent from "../../Common/MapComponent";

import { LuPlusCircle } from "react-icons/lu";

interface TourImage {
  id: number;
  image: string;
}

interface CustomTour {
  id: number;
  title: string;
  user_id: number;
  createdAt: Date;
  Places: any[];
}

const CustomTour = () => {
  const user: User | null = useSelector(selectCurrentUser);
  const [customTours, setCustomTours] = useState<CustomTour[]>([]);
  const [routeInfo, setRouteInfo] = useState<{
    duration: string;
  } | null>(null); // я хотел этот seter передать в map чтобы внутри него после отрисовки маршрута устанавливать значения длины и времени
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      if (user) {
        try {
          setLoading(true);
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/data/myCabinet/customTour`,
            { userId: user.id.toString() }
          );
          setCustomTours(response.data);
        } catch (error) {
          console.error(
            "Ошибка при получении данных о кастомных турах:",
            error
          );
          setError("Не удалось загрузить кастомные туры. Попробуйте позже.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTours();
  }, [user]);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/customTour/${id}`)
      if(response.data.text === 'OK'){
        setCustomTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <Typography variant="h3" marginBottom={"30px"}>
        Свой маршрут
      </Typography>
      <Button
        variant="text"
        onClick={() => navigate("/myCabinet/customTour")}
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
          marginBottom: "30px",
        }}
      >
        Создать маршрут
        <LuPlusCircle style={{ fontSize: "14px", marginLeft: "5px" }} />
      </Button>
      {customTours.length > 0 ? (
        <Box
          className={style.containerInner}
          sx={
            {
              // display: "flex",
              // justifyContent: "space-between",
              // flexWrap: "wrap",
            }
          }
        >
          {customTours?.map((tour, index) => (
            <Accordion
              key={tour.id}
              sx={{
                boxShadow: "none",
                background: "#F9F9F9",
                borderRadius: "15px !important",
                mb: "5px",
                "&::before": {
                  backgroundColor: "white",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${tour.id}-content`}
                id={`panel${tour.id}-header`}
              >
                <Typography component="div">
                  <Typography
                    component="span"
                    sx={{ fontWeight: "400", fontSize: "20px", color: "#000" }}
                  >
                    {tour.title}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    sx={{ fontSize: "12px", color: "#707070" }}
                  >
                    Создано:{" "}
                    {new Date(tour.createdAt).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <MapComponent
                    // setRouteInfo={setRouteInfo}
                    selectedPlacemarks={tour.Places?.map((place) => place.id)}
                  />
                  <Box
                    sx={{
                      width: "425px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          paddingBottom: "10px",
                          marginBottom: "15px",
                          borderBottom: "1px solid #E2E4E7",
                          fontSize: "18px",
                        }}
                      >
                        Детали экскурсии
                      </Typography>
                      <Box
                        sx={{
                          height: "390px",
                          overflowY: "auto",
                        }}
                      >
                        {tour.Places?.map((place, index) => (
                          <Box
                            key={place.id} // Добавьте уникальный ключ
                            sx={{
                              background: "white",
                              borderRadius: "15px",
                              padding: "15px",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{
                                border: "1px solid #1E2D9A",
                                borderRadius: "15px",
                                background: "white",
                                fontSize: "12px",
                                padding: "2px 10px",
                                marginBottom: "5px",
                                display: "inline-block",
                                color: " #1E2D9A",
                              }}
                            >
                              Пункт № {index + 1}
                            </Typography>
                            <Typography>{place.title}</Typography>
                          </Box>
                        ))}
                      </Box>
                      {/* <Typography>
                      Продолжительность экскурсии: {routeInfo?.distance}
                    </Typography>
                    <Typography>
                      Протяженность экскурсии: {routeInfo?.duration}
                    </Typography> */}
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Button
                        sx={{
                          background: "#1E2D9A",
                          textTransform: "none",
                          color: "white",
                          borderRadius: "10px",
                          fontWeight: "300",
                          fontSize: "16px",
                          paddingX: "20px",
                          "&:hover": {
                            backgroundColor: "#1E2D9A",
                          },
                        }}
                      >
                        Оставить заявку
                      </Button>
                      <Button
                        variant="text"
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
                        onClick={() => handleDelete(tour.id)}
                      >
                        Удалить
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">Туры не найдены</Typography>
      )}
    </>
  );
};

export default CustomTour;
