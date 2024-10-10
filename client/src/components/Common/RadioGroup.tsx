// @ts-ignore
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import axios from "axios";

const CustomRadio = styled(Radio)({
  color: "orange",
  "&.Mui-checked": {
    color: "orange",
  },
});

const CustomFormControlLabel = styled(FormControlLabel)({
  "& .MuiFormControlLabel-label": {
    fontWeight: 300,
  },
});

interface RowRadioButtonsGroupProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RowRadioButtonsGroup({
  value,
  onChange,
}: RowRadioButtonsGroupProps) {
  const [roles, setRoles] = React.useState<
    {
      id: string;
      title: string;
    }[]
  >([]);

  React.useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/data/roles`
        );
        setRoles(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <FormControl>
      <RadioGroup row value={value} onChange={onChange}>
        {roles?.map((role) => (
          <CustomFormControlLabel
            key={role.id}
            value={role.id}
            control={<CustomRadio />}
            label={role.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
