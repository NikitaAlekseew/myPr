// @ts-ignore
import { useSelector } from "react-redux";
import { Box, Container, Typography, Button } from "@mui/material";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";

import EmblaCarousel from "../Slider/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "../Slider/Embla.css";
import { FC, useEffect, useState } from "react";

import style from "./MainPage.module.scss";
import SearchField from "../UI/SearchField";
import IpAddress from "../Test";

//* Настройки слайдера
// const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
const OPTIONS: EmblaOptionsType = {
  align: "start",
  loop: true,
  skipSnaps: false,
};
const SLIDE_COUNT = 2;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

interface User {
  name: string;
}

interface Tour_category {
  title: string;
}

export interface Tour {
  id: number;
  Tour_category: Tour_category;
  title: string;
  content: string;
  schegule: string;
  duration: string;
  start_time: string;
  guide_id: number;
  User: User;
  cost: number;
  city?: string;
  Tour_images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  categoryId?: number;
  categoryTitle: string;
  categoryCreatedAt?: Date;
  categoryUpdateAt?: Date;
  date?: Date;
}

const MainPage: FC = () => {
  // const user = useSelector(selectCurrentUser);
  // const token = useSelector(selectCurrentToken);
  const [tours, setTours] = useState<Tour[]>([]);

  //const isAuth = user?.isActivated ?? false;
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/tours`)
      .then((res) => res.json())
      .then((res) => setTours(res))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  return (
    <>
      <Container className={style.banner} sx={{ marginBottom: "30px" }}>
        <Box sx={{ width: "640px" }}>
          <Box sx={{ display: "flex" }}>
            <Box
              component="img"
              src="../../../MainPage/aircraft.png"
              alt="описание изображения"
              sx={{
                marginRight: "15px",
                width: "34px",
                height: "34px",
              }}
            />
            <Typography
              sx={{ marginBottom: "40px", color: "#FF6D1C", fontSize: "20px" }}
            >
              Исследуйте Россию вместе с нами &mdash;
            </Typography>
          </Box>
          <Typography
            sx={{
              marginBottom: "30px",
              fontSize: "60px",
              lineHeight: "100%",
            }}
          >
            Уникальные места для отдыха в России
          </Typography>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "300",
              lineHeight: "130%",
              mb: "20px",
            }}
          >
            Россия богата как природными, так и рукотворными
            достопримечательностями, удивительными историческими постройками и
            культурными традициями.
          </Typography>
          <SearchField />
        </Box>
        <Box sx={{ display: "flex", gap: "10px", width: "450px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box
              component="img"
              src="../../../MainPage/banner-1.png"
              alt="описание изображения"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
              }}
            />
            <Box
              component="img"
              src="../../../MainPage/banner-4.png"
              alt="описание изображения"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box
              component="img"
              src="../../../MainPage/banner-2.png"
              alt="описание изображения"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
              }}
            />
            <Box
              component="img"
              src="../../../MainPage/banner-3.png"
              alt="описание изображения"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
              }}
            />
          </Box>
        </Box>
      </Container>
      <Container
        className={style.banner}
        sx={{ flexDirection: "column", marginBottom: "30px" }}
      >
        <Typography
          sx={{
            marginBottom: "30px",
            fontSize: "50px",
            lineHeight: "100%",
          }}
        >
          Популярные туры
        </Typography>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} tours={tours} />
      </Container>
      <Container
        className={style.bannerBottom}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "698px", position: "relative" }}>
          <Box sx={{ display: "flex" }}>
            <Box
              component="img"
              src="../../../MainPage/blog-icon.png"
              alt="Блог"
              sx={{
                marginRight: "15px",
                width: "34px",
                height: "34px",
              }}
            />
            <Typography
              sx={{ marginBottom: "40px", color: "#FF6D1C", fontSize: "20px" }}
            >
              Блог &mdash;
            </Typography>
          </Box>
          <Typography
            component="p"
            sx={{
              marginBottom: "30px",
              fontSize: "60px",
              lineHeight: "100%",
            }}
          >
            Интересные и позновательные статьи о путешествиях, отдыхе и туризме
          </Typography>
          <Button
            variant="text"
            sx={{
              background: "#1E2D9A",
              textTransform: "none",
              color: "white",
              borderRadius: "10px",
              fontWeight: "300",
              fontSize: "18px",
              paddingX: "30px",
              "&:hover": {
                backgroundColor: "#1E2D9A",
              },
            }}
          >
            Читать
          </Button>
        </Box>
        <Box>
          <Box
            component="img"
            src="../../../MainPage/blog-banner-1.png"
            alt="описание изображения"
            sx={{
              position: "relative",
              width: "400px",
              height: "auto",
              borderRadius: "15px",
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default MainPage;
