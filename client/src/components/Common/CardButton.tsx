// @ts-ignore
import Button from "@mui/material/Button";
import { RxArrowTopRight } from "react-icons/rx";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "& .arrow-icon": {
    transition: "transform 0.2s ease-in-out",
  },
  "&:hover .arrow-icon": {
    transform: "rotate(45deg)",
  },
}));

interface CardButtonProps {
  onClick?: () => void;
}

const CardButton: React.FC<CardButtonProps> = ({ onClick }) => {
  return (
    <StyledButton
      variant="outlined"
      sx={{
        borderRadius: "10px",
        borderColor: "#1E2D9A",
        color: "#1E2D9A",
        textTransform: "none",
        paddingY: "4px",
        fontSize: "18px",
        fontWeight: "300",
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "white",
          borderColor: "#1E2D9A",
        },
      }}
      onClick={onClick}
    >
      Подробнее
      <RxArrowTopRight className="arrow-icon w-[20px] h-[20px] text-blue" />
    </StyledButton>
  );
};

export default CardButton;
