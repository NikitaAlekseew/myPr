// @ts-ignore
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import { FC, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { FaEye } from "react-icons/fa";

import Slider from "../Slider/Slider";

import styles from "./GuideCard.module.scss";


interface TourImage {
  id: number;
  image: string;
}

interface GuideCardProps {
  id: number;
  city: string;
  title: string;
  content: string;
  cost: string;
  duration: string;
  schegule: string;
  amount: string;
  start_time: string;
  Tour_images: TourImage[];
  Tour_category: string;
  views: number
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const CustomDivider: FC = () => (
  <Divider
    orientation="vertical"
    flexItem
    sx={{
      margin: "0 8px",
      height: "20px",
      alignSelf: "center",
    }}
  />
);

const formatTime = (duration: string) => {
  const [hours, minutes] = duration.split(":");
  const hoursInt = parseInt(hours);
  const minutesInt = parseInt(minutes);

  if (minutesInt === 0) {
    return `${hoursInt} ч`;
  } else {
    return `${hoursInt} ч ${minutesInt} м`;
  }
};

const GuideCard: FC<GuideCardProps> = ({
  id,
  city,
  title,
  content,
  amount,
  cost,
  duration,
  start_time,
  Tour_images,
  Tour_category,
  schegule,
  views,
  onDelete,
  onViewDetails,
}) => {
  const navigate = useNavigate();
  const images = Tour_images?.map(
    (image) =>
      `${import.meta.env.VITE_SERVER_URL}/public/uploads/${image.image}`
  );

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/data/guide/tour/${id}`
      );
      onDelete(id);
    } catch (error) {
      console.error("Ошибка при удалении тура:", error);
    }
  };

  const handleEdit = async () => {
    navigate(`/guide/edit/tour/${id}`);
  };

  const handleViewDetails = () => {
    navigate(`/card/${id}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <Box sx={{ width: "370px", mb: 2 }} key={id}>
      <Card
        sx={{
          borderRadius: "15px",
          boxShadow: "none",
          background: "#F9F9F9",
        }}
      >
        <CardContent
          sx={{
            "&:last-child": { paddingBottom: "15px" },
            padding: "15px",
          }}
        >
          {images.length > 0 && (
            <Slider images={images} Tour_category={Tour_category} />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 300,
                color: "#b4b4b4",
              }}
            >
              Просмотров: {views}
            </Typography>
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "#b4b4b4",
                }}
              >
                Рейтинг:
              </Typography>
              <FaStar style={{ fontSize: "14px", color: "orange" }} />
            </Box> */}
          </Box>
          <Typography
            sx={{
              mb: "20px",
              height: "73px",
              fontSize: "22px",
              fontWeight: "400",
              lineHeight: "110%",
              "@media (max-width: 1180px)": {
                fontSize: (theme) => theme.typography.h6.fontSize,
              },
              "@media (max-width: 1024px)": {
                fontSize: 18,
              },
              textAlign: "start",
              wordWrap: "break-word",
            }}
          >
            {truncateText(title, 65)}
          </Typography>
          <Typography
            sx={{
              mb: 1.5,
              lineHeight: "110%",
              color: "#979797",
              fontSize: "14px",
              textAlign: "start",
            }}
          >
            {schegule}
          </Typography>
          <Typography
            component="div"
            sx={{
              display: "flex",
              mb: "6px",
              fontSize: "14px",
              color: "#979797",
            }}
          >
            Начало в {formatTime(start_time)} <CustomDivider />
            До {formatTime(duration)} <CustomDivider />
            Цена {cost}
          </Typography>
          <Typography
            sx={{
              mb: 1.5,
              lineHeight: "110%",
              "@media (max-width: 1180px)": {
                fontSize: (theme) => theme.typography.h6.fontSize,
              },
              "@media (max-width: 1024px)": {
                fontSize: 18,
              },
            }}
          >
            {city}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
              pt: 1,
              borderTop: "1px solid #EAEAEA",
            }}
          >
            <Box>
              <Button
                key={id}
                onClick={handleEdit}
                sx={{ borderRadius: 2, textTransform: "none" }}
              >
                Редактировать
              </Button>
              <Button
                color="error"
                onClick={handleDelete}
                sx={{ borderRadius: 2, textTransform: "none" }}
              >
                Удалить
              </Button>
            </Box>
            <FaEye className={styles.faEye} onClick={handleViewDetails} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GuideCard;
