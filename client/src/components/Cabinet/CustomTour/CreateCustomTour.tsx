// @ts-ignore
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Container,
  Button,
  TextField,
  Box,
  Typography,
  Checkbox,
} from "@mui/material";
import MapComponent from "../../Common/MapComponent";
import style from "./CustomTourCreationForm.module.scss";
import "./ymaps.scss";
import { selectCurrentUser } from "../../../features/auth/authSlice";

import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { TbCheckbox } from "react-icons/tb";

// интерфейс для балуна (Placemark)
interface PlacemarkType {
  id: number; // Уникальный идентификатор метки
  name: string; // Название метки
  coordinates: [string, string]; // Координаты метки (широта, долгота)
  balloonContent: string; // Контент для балуна (с поддержкой HTML)
}

interface PlaceType {
  id: number;
  title: string;
  latitude: string;
  longitude: string;
  address: string;
  description: string;
}

const CustomTour = () => {
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);

  // Инициализация состояний для полей формы
  const [title, setTitle] = useState<string>("");
  // данные достопримечательностей в виде массива для отрисовки чек-боксов и балунов на карте
  const [placemarksData, setPlacemarksData] = useState<PlacemarkType[]>([]);
  // массив айдишников только выбранных балунов
  const [selectedPlacemarks, setSelectedPlacemarks] = useState<number[]>([]);

  // Обработчик изменений в текстовых полях формы
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "title-input") {
      setTitle(value);
    }
  };

  // Обработчик изменения состояния чекбокса, принимает айди достопримечательности,
  // возвращает массив айдишников выбранных достопримечательностей
  function handleCheckboxChange(id: number): void {
    setSelectedPlacemarks((previousSelectedPlacemarks) =>
      previousSelectedPlacemarks.includes(id)
        ? previousSelectedPlacemarks.filter((placemarkId) => placemarkId !== id)
        : [...previousSelectedPlacemarks, id]
    );
  }

  //* Отправка данных с формы на сервер
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/data/myCabinet/customTour/create`,
        {
          title,
          user_id: user?.id.toString(),
          array_of_place_id: selectedPlacemarks,
        },
        { headers: { "Content-Type": "application/json" } }
        // { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 200) {
        navigate("/myCabinet");
      }
    } catch (error) {
      console.error("Ошибка при сохранении кастомного тура:", error);
    }
  };

  // при загрузке страницы забраем достопримечательности из базы и пихаем в состояние placemarksData
  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/data/places`
        );

        const newArray = response.data?.map((place: PlaceType) => ({
          id: place.id,
          name: place.title,
          coordinates: [place.latitude, place.longitude],
          balloonContent: `
                 <div>
                 <h2>${place.title}</h2>
                 <p><strong>Адрес:</strong> ${place.address}</p>
                 <img src="https://muzobozrenie.ru/wp-content/uploads/2018/10/kaliningrad_sobor.jpg" alt="${place.title}" style="width:100%;height:auto;" />
                 <p>${place.description}</p>
                 </div>
                 `,
        }));
        setPlacemarksData(newArray);
      } catch (error) {
        console.error("Ошибка при загрузке данных из таблицы Places:", error);
      }
    };

    getPlaces();
  }, []);

  return (
    <Container className={style.container}>
      <Typography variant="h3" mb={2}>
        Свой маршрут
      </Typography>
      <Box className={style.containerInner}>
        <form onSubmit={handleSubmit}>
          <Typography component="p" fontSize={20} marginBottom={1}>
            Введит название маршрута:
          </Typography>
          <TextField
            id="title-input"
            fullWidth
            value={title}
            onChange={handleChange}
            required
            sx={{
              mb: "20px",
              background: "white",
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
          />
          {/* нарисуем чек-боксы достопримечательностей с их именами */}
          {/* {placemarksData
            .sort((a: PlacemarkType, b: PlacemarkType) => a.id - b.id) // сортировка по айди из базы, надо бы сделать сортировку прямо в базе, чтобы при изменении записей сортировка в базе сохранялась, после чего эту строку удалить
            ?.map((placemark: PlacemarkType) => (
              <div key={placemark.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${placemark.id}`}
                  onChange={() => handleCheckboxChange(placemark.id)} // хэндлер меняет массив выбранных чек-боксов достопримечательностей, поэтому каждый раз перерендеривается компонент карты Placemark
                />
                <MdCheckBoxOutlineBlank
                  style={{ fontSize: "26px", cursor: "pointer" }}
                />
                <label htmlFor={`checkbox-${placemark.id}`}>
                  {placemark.name}
                </label>
              </div>
            ))} */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <MapComponent
              placemarksData={placemarksData}
              selectedPlacemarks={selectedPlacemarks}
              className="ymaps"
            />

            <Box
              sx={{
                width: "400px",
                background: "white",
                borderRadius: "15px",
                padding: "15px",
                fontFamily: "Geologica",
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
                Выберите достопремечательности:
              </Typography>
              {placemarksData
                .sort((a: PlacemarkType, b: PlacemarkType) => a.id - b.id)
                ?.map((placemark: PlacemarkType) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                    key={placemark.id}
                  >
                    <Checkbox
                      sx={{
                        padding: "0",
                        paddingRight: "5px",
                      }}
                      icon={
                        <MdCheckBoxOutlineBlank style={{ fontSize: "22px" }} />
                      }
                      checkedIcon={<TbCheckbox style={{ fontSize: "22px" }} />}
                      id={`checkbox-${placemark.id}`}
                      onChange={() => handleCheckboxChange(placemark.id)}
                    />
                    <label
                      htmlFor={`checkbox-${placemark.id}`}
                      style={{ fontWeight: "300" }}
                    >
                      {placemark.name}
                    </label>
                  </Box>
                ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              type="submit"
              sx={{
                background: "white",
                border: "1px solid #1E2D9A",
                textTransform: "none",
                color: "#1E2D9A",
                borderRadius: "10px",
                fontWeight: "300",
                fontSize: "18px",
                paddingX: "20px",
                "&:hover": {
                  backgroundColor: "#1E2D9A",
                  color: "white",
                },
              }}
            >
              Создать свой маршрут
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CustomTour;
