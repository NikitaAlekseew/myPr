// @ts-ignore
import style from "./TourCreationForm.module.scss";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import {
  Container,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import DaysWeekCheckbox from "../common/DaysWeekCheckbox";
import TourCategorySelect from "../common/TourCategorySelect";
import MultipleImageLoader from "../common/MultipleImageLoader";

import { selectCurrentUser } from "../../../features/auth/authSlice";

import Editor from "../TextEditor/Editor";
import CustomSelect from "../../Common/CustomSelect";

//! Функция для загрузки изображений на сервер
const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/data/upload`,
      formData
    );
    return response.data.url;
  } catch (error) {
    console.error("Image upload failed", error);
    throw error;
  }
};

const TourCreationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const user = useSelector(selectCurrentUser);

  const [category, setCategory] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [city, setCity] = useState<string>("");
  console.log("city", city);

  function getFileNameFromUrl(url: string): string | null {
    const parts = url.split("/");
    return parts.pop() || null;
  }

  const existingFileNames = files
    .filter((file) => !(file instanceof File))
    ?.map((file) => getFileNameFromUrl(file.preview));

  const handleImageUpload = async () => {
    const imageUrls = await Promise.all(
      files?.map(async (file) => {
        try {
          return await uploadImage(file);
        } catch (error) {
          console.error("Failed to upload image", error);
          return "";
        }
      })
    );
    return imageUrls;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "title-input") {
      setTitle(value);
    } else if (id === "content-input") {
      setContent(value);
    } else if (id === "price-input") {
      setPrice(value);
    } else if (id === "duration-input") {
      setDuration(value);
    } else if (id === "start-time-input") {
      setStartTime(value);
    }
  };

  //* Выбор дней недели
  const handleDaysChange = (days: string[]) => {
    setSelectedDays(days);
  };

  //* Выбор категории тура
  const handleCategoryChange = (event: ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  //* Добавление фото
  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  //* Отправка данных с формы на сервер
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Загрузка изображений и получение URL
      const imageUrls = await handleImageUpload();

      // Обновление содержимого редактора с новыми URL изображений
      let updatedContent = content;

      imageUrls.forEach((url) => {
        // Замените временные или относительные URL-адреса изображений на URL-адреса, полученные после загрузки
        updatedContent = updatedContent.replace(
          /<img[^>]+src="([^">]+)"/g,
          (match, p1) => {
            if (files.find((file) => file.name === p1)) {
              return match.replace(p1, url);
            }
            return match;
          }
        );
      });

      console.log("updatedContent", updatedContent);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", updatedContent);
      formData.append("schegule", selectedDays.join(", "));
      formData.append("category", category);
      formData.append("price", price);
      formData.append("duration", duration);
      formData.append("start_time", startTime);
      formData.append("city", city);
      formData.append("guide_id", user?.id.toString());

      files.forEach((file) => {
        formData.append("images", file);
      });

      formData.append("existingFileNames", JSON.stringify(existingFileNames));

      if (location.pathname === "/guide/new/tour") {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/data/guide/tour/create`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (res.status === 200) {
          navigate("/guide");
        }
      } else if (location.pathname === `/guide/edit/tour/${params.id}`) {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/data/guide/tour/edit/${
            params.id
          }`,
          formData,
          // { headers: { "Content-Type": "application/json" } },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (res.status === 200) {
          navigate("/guide");
        }
      }
    } catch (error) {
      console.error("Ошибка при сохранении тура:", error);
    }
  };

  useEffect(() => {
    if (location.pathname === `/guide/edit/tour/${params.id}`) {
      axios
        .get(
          `${import.meta.env.VITE_SERVER_URL}/data/guide/tour/edit/${params.id}`
        )
        .then((res) => {
          const tourData = res.data;
          setCategory(tourData.category_id.toString());
          setDuration(tourData.duration);
          setStartTime(tourData.start_time);
          setTitle(tourData.title);
          setContent(tourData.content);
          setPrice(tourData.cost.toString());
          setCity(tourData.city_id);
          setSelectedDays(tourData.schegule.split(", "));
          setFiles(
            tourData.Tour_images?.map((image: any) => ({
              id: image.id || `${image.image}`,
              name: image.image,
              preview: `${import.meta.env.VITE_SERVER_URL}/public/uploads/${
                image.image
              }`,
            }))
          );
        })
        .catch((err) => console.error("Error fetching tour data:", err));
    }
  }, [location.pathname, params.id]);

  //const [selectedTime, setSelectedTime] = useState("");

  const generateTimeSlots = () => {
    const times = [];
    let startTime = 0;
    while (startTime < 24 * 60) {
      const hours = Math.floor(startTime / 60);
      const minutes = startTime % 60;
      const timeString = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
      times.push(timeString);
      startTime += 30;
    }
    return times;
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setStartTime(event.target.value as string);
  };

  const handleDurationChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setDuration(event.target.value as string);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <Container className={style.container}>
      <Typography variant="h3" mb={2}>
        Создание экскурсии
      </Typography>
      <Box className={style.containerInner}>
        <form onSubmit={handleSubmit}>
          <Typography component="p" fontSize={20} marginBottom={1}>
            Фотографии
          </Typography>
          <MultipleImageLoader
            files={files}
            onFilesChange={handleFilesChange}
          />
          <Typography component="p" fontSize={20} marginBottom={1}>
            Название:
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
          <Typography component="p" fontSize={20} marginBottom={1}>
            Описание:
          </Typography>

          <Box mb={"20px"}>
            <Editor value={content} onChange={setContent} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "30px",
            }}
          >
            <Box>
              <Typography component="p" fontSize={20} marginBottom={1}>
                Выберите дни экскурсии
              </Typography>
              <DaysWeekCheckbox
                selectedDays={selectedDays}
                onChange={handleDaysChange}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography component="p" fontSize={20} marginBottom={1}>
                Тип экскурсии
              </Typography>
              <TourCategorySelect
                value={category}
                onChange={handleCategoryChange}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              mb: "30px",
              border: "1px solid #a9a9a9",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography component="p" fontSize={20} marginBottom={1}>
                Начало
              </Typography>
              <FormControl
                fullWidth
                sx={{
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
              >
                <Select
                  id="start-time-input"
                  value={startTime}
                  onChange={handleStartTimeChange}
                >
                  {generateTimeSlots()?.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography component="p" fontSize={20} marginBottom={1}>
                Продолжительность
              </Typography>
              <FormControl
                fullWidth
                sx={{
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
              >
                <Select
                  id="duration-input"
                  value={duration}
                  onChange={handleDurationChange}
                >
                  {generateTimeSlots()?.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography component="p" fontSize={20} marginBottom={1}>
                Цена
              </Typography>
              <TextField
                fullWidth
                id="price-input"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={price}
                onChange={handleChange}
                sx={{
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
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography component="p" fontSize={20} marginBottom={1}>
                Выберите город
              </Typography>
              <CustomSelect
                value={city}
                onChange={(e) => setCity(e.target.value as string)}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              type="submit"
              variant="outlined"
              //onClick={handleImageUpload}
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                borderRadius: "10px",
                backgroundColor: "white",
                textTransform: "none",
                fontSize: "20px",
                fontWeight: 300,
                "&:hover": {
                  backgroundColor: "primary.main",
                  borderColor: "primary.main",
                  color: "white",
                },
              }}
            >
              {location.pathname === "/guide/new/tour"
                ? "Создать тур"
                : "Сохранить тур"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default TourCreationForm;
