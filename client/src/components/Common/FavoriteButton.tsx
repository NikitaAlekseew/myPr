// @ts-ignore
import { IconButton } from "@mui/material";
//import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import axios from "axios";
import { useLocation } from "react-router-dom";

//import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

interface FavoriteButtonProps {
  id: number;
  onLiked?: () => void;
}

interface Favourite {
  id: number;
  tour_id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id, onLiked }) => {
  const [color, setColor] = useState<boolean>(false);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const hasFetchedData = useRef(false);

  const favourite: { tour_id: number }[] = JSON.parse(
    localStorage.getItem("favourite") || "[]"
  );

  useEffect(() => {
    const favouriteData = async () => {
      try {
        if (!hasFetchedData.current) {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/favourite`
          );
          const { data }: { data: Favourite[] } = response;

          data.forEach((el) => {
            if (
              user?.id === el.user_id &&
              !favourite.some((fav) => fav.tour_id === el.tour_id)
            ) {
              favourite.push({ tour_id: el.tour_id });
              localStorage.setItem("favourite", JSON.stringify(favourite));
            }
          });
          hasFetchedData.current = true;
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    favouriteData();

    if (favourite.some((el) => el.tour_id === id)) {
      setColor(true);
    }
  }, [favourite, id, user?.id]);

  const handleFavorite = async () => {
    if (color === false) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/favourite`,
          {
            user_id: user?.id,
            tour_id: id,
          }
        );

        if (response.data.message === "OK") {
          setColor(true);
          favourite.push({ tour_id: id });
          localStorage.setItem("favourite", JSON.stringify(favourite));
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/favourite`,
          {
            data: {
              user_id: user?.id,
              tour_id: id,
            },
          }
        );

        if (response.data.message === "OK") {
          const updatedFavourites = favourite.filter((el) => el.tour_id !== id);
          localStorage.setItem("favourite", JSON.stringify(updatedFavourites));
          setColor(false);
          if (location.pathname === "/myCabinet") {
            onLiked();
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const isAuth = user?.role_id === 2 ? user.isActivated ?? true : false;

  return (
    <>
      {isAuth && (
        <IconButton
          aria-label="favorite"
          sx={{ ml: "5.97px", boxSizing: "content-box" }}
          onClick={handleFavorite}
          key={id}
        >
          {color ? <AiFillLike style={{ color: "red" }} /> : <AiOutlineLike />}

          {/* <FavoriteIcon sx={color ? { color: "red" } : { color: "gray" }} /> */}
        </IconButton>
      )}
    </>
  );
};

export default FavoriteButton;
