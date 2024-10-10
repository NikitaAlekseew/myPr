// @ts-ignore
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import DOMPurify from "dompurify";
import { Calendar } from "../Calendar/Calendar";

import style from "./CardDetail.module.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

interface TourImage {
  id: number;
  image: string;
}

interface TourCategory {
  id: number;
  title: string;
}

interface Tour {
  id: number;
  title: string;
  content: string;
  cost: string;
  duration: string;
  start_time: string;
  amount: string;
  schegule: string;
  Tour_images: TourImage[];
  Tour_category: TourCategory;
  city: string;
}

const formatTime = (duration: string): string => {
  const [hours, minutes] = duration.split(":");
  const hoursInt = parseInt(hours);
  const minutesInt = parseInt(minutes);

  const formatHours = (hours: number): string => {
    if (hours === 1) return `${hours} час`;
    if (hours >= 2 && hours <= 4) return `${hours} часа`;
    return `${hours} часов`;
  };

  const formatMinutes = (minutes: number): string => {
    if (minutes === 1) return `${minutes} минута`;
    if (minutes >= 2 && minutes <= 4) return `${minutes} минуты`;
    return `${minutes} минут`;
  };

  if (minutesInt === 0) {
    return formatHours(hoursInt);
  } else {
    return `${formatHours(hoursInt)} ${formatMinutes(minutesInt)}`;
  }
};

const formatNumberWithSpaces = (number: number): string => {
  return new Intl.NumberFormat("ru-RU").format(number);
};

const CardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [amount, setAmount] = useState<string>("");
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const arrayDayWeek = tour?.schegule.toLocaleLowerCase().split(", ");

  const checkArray = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const filterArray = checkArray
    ?.map((el, index) => (arrayDayWeek?.indexOf(el) === -1 ? index : -1))
    .filter((index) => index !== -1);
  const disabledWeeks = [{ before: new Date() }, { dayOfWeek: filterArray }];

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/data/card/${id}`
        );
        setTour(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных о туре:", error);
        setError("Не удалось загрузить данные о туре. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!tour) return <Typography variant="body1">Тур не найден</Typography>;

  const generateNumberOptions = (max: number) => {
    return Array.from({ length: max }, (_, index) => index + 1);
  };

  const handleAmountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmount(event.target.value as string);
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/booking`,
        {
          tour_id: id,
          user_id: user?.id,
          date: selectedDate,
        }
      );
      if (response.data.text === "no date") {
        alert("Вы не выбрали дату. Выберите дату для заказа тура");
      }
      if (response.data.text === "OK") {
        alert("Тур успешно заказан");
        navigate("/");
      }
    } catch (error) {
      console.error("booking handler", error);
    }
  };

  const isAuth = user?.role_id === 2 ? user.isActivated ?? true : false;

  return (
    <>
      <Container className={style.container} sx={{ marginBottom: "50px" }}>
        <Typography
          variant="h1"
          gutterBottom
          sx={{ fontSize: "48px", fontWeight: 400 }}
        >
          {tour.title}
        </Typography>
        <Box
          sx={{ fontFamily: "Geologica, sans-serif" }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tour.content) }}
        />
      </Container>
      {user?.role_id === 2 && (
        <Container className={style.container} sx={{ marginBottom: "50px" }}>
          <Typography
            variant="h1"
            gutterBottom
            sx={{ fontSize: "48px", fontWeight: 400 }}
          >
            Запись на экскурсию
          </Typography>
          <Box
            className={style.containerInner}
            sx={{ display: "flex", gap: "20px" }}
          >
            {isAuth ? (
              <>
                <Calendar
                  onDateSelect={setSelectedDate}
                  disabledWeeks={disabledWeeks}
                />
                <Box
                  sx={{
                    ...(selectedDate
                      ? {
                          padding: "15px",
                          width: "100%",
                          background: "white",
                          borderRadius: "15px",
                        }
                      : {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "15px",
                          width: "100%",
                          background: "white",
                          borderRadius: "15px",
                        }),
                  }}
                >
                  {!selectedDate ? (
                    <Typography variant="h5">
                      Выберите дату, чтобы записаться на экскурсию
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="h4" sx={{ marginBottom: "15px" }}>
                        {selectedDate.toLocaleDateString("ru-RU", {
                          month: "long",
                          day: "2-digit",
                        })}{" "}
                        в {tour.start_time}
                      </Typography>
                      <Typography
                        sx={{ marginBottom: "8px", fontSize: "18px" }}
                      >
                        <Box component="span" sx={{ fontWeight: "300" }}>
                          Тип экскурсии -
                        </Box>{" "}
                        {tour.Tour_category.title}
                      </Typography>
                      <Typography
                        sx={{ marginBottom: "8px", fontSize: "18px" }}
                      >
                        <Box component="span" sx={{ fontWeight: "300" }}>
                          Начало экскурсии -
                        </Box>{" "}
                        {tour.start_time}
                      </Typography>
                      <Typography
                        sx={{ marginBottom: "8px", fontSize: "18px" }}
                      >
                        <Box component="span" sx={{ fontWeight: "300" }}>
                          Продолжительность -
                        </Box>{" "}
                        {formatTime(tour.duration)}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "30px",
                          marginBottom: "12px",
                          maxWidth: "210px",
                        }}
                      >
                        <Typography
                          component="p"
                          sx={{
                            fontSize: "18px",
                            fontWeight: "300",
                            lineHeight: "120%",
                          }}
                        >
                          Количество человек
                        </Typography>
                        <FormControl
                          fullWidth
                          sx={{
                            background: "#f9f9f9",
                            borderRadius: "10px",
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                border: "none",
                              },
                              "&:hover fieldset": {
                                border: "none",
                              },
                              "&.Mui-focused fieldset": {
                                border: "none",
                              },
                            },
                          }}
                        >
                          <Select
                            id="amount-input"
                            value={amount}
                            onChange={handleAmountChange}
                            sx={{ paddingLeft: "8px", fontSize: "18px" }}
                          >
                            {generateNumberOptions(20)?.map((num) => (
                              <MenuItem key={num} value={num}>
                                {num}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Typography
                        sx={{ marginBottom: "25px", fontSize: "18px" }}
                      >
                        <Box component="span" sx={{ fontWeight: "300" }}>
                          Итоговая стоимость -
                        </Box>{" "}
                        <Box
                          component="span"
                          sx={{ fontSize: "20px", fontWeight: "500" }}
                        >
                          {formatNumberWithSpaces(Number(tour.cost))} ₽
                        </Box>
                      </Typography>
                      <Button
                        type="submit"
                        variant="outlined"
                        //onClick={handleImageUpload}
                        sx={{
                          borderColor: "primary.main",
                          color: "white",
                          borderRadius: "10px",
                          backgroundColor: "primary.main",
                          textTransform: "none",
                          fontSize: "18px",
                          fontWeight: 300,
                          "&:hover": {
                            backgroundColor: "primary.main",
                            borderColor: "primary.main",
                            color: "white",
                          },
                        }}
                        onClick={handleBooking}
                      >
                        Записаться на экскурсию
                      </Button>
                    </>
                  )}
                </Box>
              </>
            ) : (
              <Typography>
                Чтобы записать на экскурсию, нужно зарегистрироваться, как
                турист
              </Typography>
            )}
          </Box>
        </Container>
      )}
    </>
  );
};

export default CardDetail;
