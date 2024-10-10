// @ts-ignore
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useEffect, useReducer, useState, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, User } from "../../features/auth/authSlice";
import GuideCard from "./GuideCard/GuideCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setEditableTour } from "../../features/editTour/editTourSlice";
import reducerGuideShowTour from "./reducerGuideShowTour";
import style from "./GuidePage.module.scss";
import BasicBars from "./common/OrderStatistics";

import { LuPlusCircle } from "react-icons/lu";

interface TourImage {
  id: number;
  image: string;
}

interface Tour {
  id: number;
  Tour_category: { title: string };
  City: { title: string };
  category: string;
  title: string;
  content: string;
  schegule: string;
  cost: string;
  duration: string;
  start_time: string;
  number_of_tour_participants: string;
  Tour_images: TourImage[];
  createdAt?: Date;
  views?: number;
}

const GuidePage = () => {
  const user: User | null = useSelector(selectCurrentUser);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [state, dispatch] = useReducer(reducerGuideShowTour, "ALL_TOURS");
  const dispatchToEditTour = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const normalizeDate = (dateString: string) => {
    // Преобразование строки даты в объект Date и получение строки формата YYYY-MM-DD
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  const today = normalizeDate(new Date().toISOString()); // Текущая дата в формате YYYY-MM-DD

  const activeTours = tours.filter((el) => {
    const tourDate = normalizeDate(el?.createdAt);
    return tourDate >= today;
  });

  const pastTours = tours.filter((el) => {
    const tourDate = normalizeDate(el?.createdAt);
    return tourDate < today;
  });

  const fetchTours = async () => {
    if (user) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/data/guide/tour/cards`,
          { userId: user.id.toString() }
        );
        setTours(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных о турах:", error);
        setError("Не удалось загрузить туры. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTours();
  }, [user, location]);

  const handleEdit = useCallback(
    (tour: Tour) => {
      dispatchToEditTour(setEditableTour(tour));
    },
    [dispatchToEditTour]
  );

  const handleDelete = useCallback((id: number) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
  }, []);

  const handleViewDetails = (id: number) => {
    const tour = tours.find((tour) => tour.id === id) || null;
    setSelectedTour(tour);
  };

  const getButtonStyle = (isActive: boolean) => ({
    position: "relative",
    backgroundColor: "#ffffff",
    border: "none",
    color: isActive ? "#000000" : "#707070",
    fontWeight: "400",
    cursor: "pointer",
    padding: "0 2px",
    outline: "none",
    textDecoration: "none",
    textTransform: "none",

    "&:hover": {
      color: "#000000",
      backgroundColor: "#ffffff",
    },

    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "-3px",
      left: "50%",
      width: isActive ? "100%" : "0%",
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
      {location.pathname === "/guide" && (
        <>
          <Container className={style.container} sx={{ marginBottom: "30px" }}>
            <Typography variant="h3" marginBottom={"30px"}>
              Статистика заказов
            </Typography>
            <BasicBars />
          </Container>
          <Container className={style.container}>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                <Typography variant="h3" marginBottom={"30px"}>
                  Мои туры
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",

                    flexDirection: "column",
                  }}
                >
                  {" "}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        display: { xs: "none", md: "flex" },
                        gap: 4,
                      }}
                    >
                      <Button
                        sx={getButtonStyle(state === "ALL_TOURS")}
                        variant="text"
                        onClick={() => dispatch({ type: "SHOW_ALL_TOURS" })}
                      >
                        Все туры
                      </Button>

                      <Button
                        sx={getButtonStyle(state === "ACTIVE_TOURS")}
                        variant="text"
                        onClick={() => dispatch({ type: "SHOW_ACTIVE_TOURS" })}
                      >
                        Активные
                      </Button>

                      <Button
                        sx={getButtonStyle(state === "PAST_TOURS")}
                        variant="text"
                        onClick={() => dispatch({ type: "SHOW_PAST_TOURS" })}
                      >
                        Закрытые
                      </Button>
                    </Box>
                    <Button
                      variant="text"
                      onClick={() => navigate("/guide/new/tour")}
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
                      Создать тур
                      <LuPlusCircle
                        style={{ fontSize: "14px", marginLeft: "5px" }}
                      />
                    </Button>
                  </Box>
                  {state === "ALL_TOURS" && (
                    <>
                      {tours.length > 0 ? (
                        <Box
                          className={style.containerInner}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                          }}
                        >
                          {tours?.map((tour) => (
                            <GuideCard
                              key={tour.id}
                              id={tour.id}
                              Tour_category={tour.Tour_category.title}
                              amount={tour.number_of_tour_participants}
                              title={tour.title}
                              content={tour.content}
                              cost={tour.cost}
                              duration={tour.duration}
                              start_time={tour.start_time}
                              schegule={tour.schegule}
                              Tour_images={tour.Tour_images}
                              views={tour.views}
                              onEdit={() => handleEdit(tour)}
                              onDelete={() => handleDelete(tour.id)}
                              onViewDetails={handleViewDetails}
                            />
                          ))}
                        </Box>
                      ) : (
                        <Typography
                          variant="h3"
                          paddingY={"40px"}
                          textAlign={"center"}
                        >
                          Туры не найдены
                        </Typography>
                      )}
                    </>
                  )}
                  {state === "ACTIVE_TOURS" && (
                    <>
                      {activeTours.length > 0 ? (
                        <Box
                          className={style.containerInner}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                          }}
                        >
                          {activeTours?.map((tour) => (
                            <GuideCard
                              key={tour.id}
                              id={tour.id}
                              Tour_category={tour.Tour_category.title}
                              amount={tour.number_of_tour_participants}
                              title={tour.title}
                              content={tour.content}
                              cost={tour.cost}
                              duration={tour.duration}
                              start_time={tour.start_time}
                              schegule={tour.schegule}
                              Tour_images={tour.Tour_images}
                              onEdit={() => handleEdit(tour)}
                              onDelete={() => handleDelete(tour.id)}
                              onViewDetails={handleViewDetails}
                            />
                          ))}
                        </Box>
                      ) : (
                        <Typography
                          variant="h3"
                          paddingY={"40px"}
                          textAlign={"center"}
                        >
                          Активные туры не найдены
                        </Typography>
                      )}
                    </>
                  )}
                  {state === "PAST_TOURS" && (
                    <>
                      {pastTours.length > 0 ? (
                        <Box
                          className={style.containerInner}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                          }}
                        >
                          {pastTours?.map((tour) => (
                            <GuideCard
                              key={tour.id}
                              id={tour.id}
                              Tour_category={tour.Tour_category.title}
                              amount={tour.number_of_tour_participants}
                              title={tour.title}
                              content={tour.content}
                              cost={tour.cost}
                              duration={tour.duration}
                              start_time={tour.start_time}
                              schegule={tour.schegule}
                              Tour_images={tour.Tour_images}
                              onEdit={() => handleEdit(tour)}
                              onDelete={() => handleDelete(tour.id)}
                              onViewDetails={handleViewDetails}
                            />
                          ))}
                        </Box>
                      ) : (
                        <Typography
                          variant="h3"
                          paddingY={"40px"}
                          textAlign={"center"}
                        >
                          Прошедшие туры не найдены
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              </>
            )}
          </Container>
        </>
      )}
      <Outlet />
    </>
  );
};

export default GuidePage;
