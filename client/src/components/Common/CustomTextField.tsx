// @ts-ignore
import { FC } from "react";
import TextField from "@mui/material/TextField";
import { FieldProps } from "formik";

// Стили для input
const textFieldStyles = {
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

// Интерфейс CustomTextFieldProps наследует типы FieldProps от Formik и включает в себя свойства field и form, которые будут использоваться в компоненте
interface CustomTextFieldProps extends FieldProps {
  label: string;
  type?: string;
  autoFocus?: boolean;
  fullWidth: boolean;
}

const CustomTextField: FC<CustomTextFieldProps> = ({
  field,
  form,
  label,
  type = "text",
  autoFocus,
  fullWidth = true,
}) => {
  const { touched, errors } = form;
  const error = touched[field.name] && errors[field.name];

  return (
    <TextField
      {...field}
      label={label}
      type={type}
      autoFocus={autoFocus}
      variant="outlined"
      sx={textFieldStyles}
      fullWidth={fullWidth}
      error={!!error}
      helperText={typeof error === "string" ? error : undefined}
    />
  );
};

export default CustomTextField;
