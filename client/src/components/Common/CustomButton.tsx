// @ts-ignore
import { ReactNode } from "react";
import Button from "@mui/material/Button";

const buttonStyles = {
  backgroundColor: "bluelight",
  color: "white",
  borderRadius: 2,
  paddingY: 1,
  paddingX: 2,
  marginBottom: 2,
  "&:hover": {
    backgroundColor: "orange",
  },
};

interface CustomButtonProps {
  type: "submit" | "button";
  fullWidth?: boolean;
  children: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  fullWidth = true,
  children,
}) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant="contained"
      sx={buttonStyles}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
