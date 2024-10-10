// @ts-ignore
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const сustomSelectStyles = {
  borderRadius: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    "& fieldset": {
      border: "1px solid orange",
    },
    "&:hover fieldset": {
      borderColor: "orange",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid orange",
    },
    "& input": {
      color: "black",
    },
  },
};

const CustomMaskedInput = ({ field, form, ...props }) => {
  return (
    <InputMask {...field} {...props} sx={сustomSelectStyles}>
      {(inputProps) => <TextField {...inputProps} fullWidth />}
    </InputMask>
  );
};

export default CustomMaskedInput;
