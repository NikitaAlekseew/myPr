// @ts-ignore
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

interface MainButtonProps {
  name: string;
  path?: string;
  icon?: ReactNode;
  variant?: "text" | "outlined" | "contained";
  onClick?: () => void;
  iconSize?: string;
}

export default function MainButton({
  name,
  path,
  icon,
  variant,
  onClick,
  iconSize = "18px",
}: MainButtonProps) {
  return (
    <Button
      variant={variant}
      key={name}
      component={path === "#" ? "button" : Link}
      to={path !== "#" ? path : undefined}
      onClick={onClick}
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
          fontSize: iconSize,
        },
      }}
    >
      {name}
      {icon && <span className="icon">{icon}</span>}
    </Button>
  );
}
