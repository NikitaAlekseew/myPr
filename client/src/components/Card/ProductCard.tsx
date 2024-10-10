// @ts-ignore
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardButton from "../Common/CardButton";

import { useLocation, useNavigate } from "react-router-dom";

import { LuDot } from "react-icons/lu";
import { CardMedia } from "@mui/material";
import FavoriteButton from "../Common/FavoriteButton";
import { Tour } from "../MainPage/MainPage";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import axios from "axios";
import Slider from "../GuidePage/Slider/Slider";

interface ProductCardProps extends Tour {
  onLiked?: () => void; // Новое свойство для удаления карточки
  favoriteButtonViewNone?: boolean;
}

export default function ProductCard({
  id,
  title,
  schegule,
  duration,
  start_time,
  cost,
  Tour_category,
  Tour_images,
  onLiked,
  User,
  favoriteButtonViewNone,
}: ProductCardProps) {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const firstImage = Tour_images?.map(
    (img) => `${import.meta.env.VITE_SERVER_URL}/public/uploads/${img.image}`
  );

  const location = useLocation();

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hoursInt = parseInt(hours);
    const minutesInt = parseInt(minutes);

    const getHourLabel = (hours: number) => {
      if (hours === 1) return "час";
      if (hours >= 2 && hours <= 4) return "часа";
      return "часов";
    };

    const getMinuteLabel = (minutes: number) => {
      if (minutes === 1) return "минута";
      if (minutes >= 2 && minutes <= 4) return "минуты";
      return "минут";
    };

    if (minutesInt === 0) {
      return `${hoursInt} ${getHourLabel(hoursInt)}`;
    } else {
      return `${hoursInt} ${getHourLabel(
        hoursInt
      )} ${minutesInt} ${getMinuteLabel(minutesInt)}`;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const isAuth = user?.role_id === 2 ? user.isActivated ?? true : false;

  const handleViewDetails = async () => {
    if (isAuth) {
      try {
        await axios.put(`${import.meta.env.VITE_SERVER_URL}/tours`, {
          id: id,
          count: 1,
        });
      } catch (error) {
        console.error("Ручка счетчик", error);
      }
    }
    navigate(`/card/${id}`);
  };

  return (
    <Box
      sx={{ maxWidth: location.pathname === "/cards" ? "375px" : "450px" }}
      key={id}
    >
      <Card
        variant="outlined"
        sx={{
          borderRadius: "20px",
          border: "none",
          background: "#F9F9F9",
          transition: "transform 0.3s, box-shadow 0.3s",
          padding: "20px",
          "&:hover": {
            transform: "translateY(-10px)",
            cursor: "pointer",
          },
        }}
      >
        <CardContent
          sx={{
            "&:last-child": { paddingBottom: "0" },
            padding: "0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: location.pathname === "/cards" ? "0" : "20px",
            }}
          >
            {location.pathname !== "/cards" && (
              <Typography
                sx={{
                  display: "inline-block",
                  background: "white",

                  paddingY: "6px",
                  paddingX: "20px",
                  border: `1px solid ${
                    Tour_category.title === "Автобусная экскурсия"
                      ? "#1E2D9A"
                      : "#DA251C"
                  }`,
                  borderRadius: "10px",
                  fontSize: "18px",
                  textAlign: "center",
                  "@media (max-width: 1080px)": {
                    fontSize: 16,
                  },
                }}
              >
                {Tour_category.title}
              </Typography>
            )}
            {!favoriteButtonViewNone && location.pathname !== "/cards" && (
              <FavoriteButton id={id} onLiked={onLiked} />
            )}
          </Box>
          {location.pathname === "/cards" ? (
            <Slider images={firstImage} Tour_category={Tour_category.title} />
          ) : (
            <CardMedia
              component="img"
              src={firstImage[0]}
              alt="Изображение экскурсии"
              sx={{ mb: 2, borderRadius: "10px", height: "180px" }}
            />
          )}

          <Typography
            component="p"
            sx={{
              mb: "6px",
              fontSize: "14px",
              color: "#979797",
            }}
          >
            {schegule}
            <LuDot style={{ display: "inline", verticalAlign: "middle" }} />
            до {formatTime(duration)}
            <LuDot
              style={{ display: "inline", verticalAlign: "middle" }}
            />с {start_time}
          </Typography>
          <Typography
            component="p"
            sx={{
              mb: 1.5,
              lineHeight: "110%",
              paddingBottom: "20px",
              borderBottom: "1px solid #D9D9D9",
              wordWrap: "break-word",
              minHeight: "101px",
              fontSize: "24px",
            }}
          >
            {truncateText(title, location.pathname === "/cards" ? 60 : 70)}
          </Typography>
          <Box
            sx={{
              mb: "20px",
            }}
          >
            <Typography
              component="p"
              sx={{ mb: "2px", fontSize: "14px", color: "#979797" }}
            >
              Экскурсовод
            </Typography>
            <Typography component="p">{User.name}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardButton onClick={handleViewDetails} />
            <Typography variant="h6" component="p">
              от {cost}
            </Typography>
            {!favoriteButtonViewNone && location.pathname === "/cards" && (
              <FavoriteButton id={id} onLiked={onLiked} />
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
