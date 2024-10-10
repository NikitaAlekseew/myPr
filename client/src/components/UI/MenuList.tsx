// @ts-ignore
import * as React from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiMenu3Fill } from "react-icons/ri";

export default function MenuList() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyCabinetClick = () => {
    navigate("/myCabinet"); // Переход на маршрут /myCabinet
    handleClose(); // Закрываем меню после клика
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          textTransform: "none",
          padding: "4px 16px",
          gap: "10px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "300",
          border: "1px solid #1976d2",
          transition:
            "color 0.6s ease,background-color 0.6s ease, border 0.6s ease, box-shadow 0.6s ease",
          "&:hover": {
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "1px solid #1976d2",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
          "& .icon": {
            fontSize: "16px",
          },
        }}
      >
        Меню
        <RiMenu3Fill className="icon" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleMyCabinetClick}>Мой кабинет</MenuItem>
        <MenuItem onClick={handleClose}>Экскурсии</MenuItem>
        <MenuItem onClick={handleClose}>Блог</MenuItem>
      </Menu>
    </div>
  );
}
