// @ts-ignore
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";

const customSelectStyles = {
  background: "white",
  borderRadius: "10px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
};

interface CustomSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

export default function CustomSelect({ value, onChange }: CustomSelectProps) {
  const [cities, setCities] = useState<
    {
      id: string;
      title: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/data/cities`
        );
        setCities(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <Box>
      <FormControl fullWidth sx={customSelectStyles}>
        <Select id="city-select" value={value} onChange={onChange}>
          <MenuItem value="" disabled>
            Выберите ваш город
          </MenuItem>
          {cities?.map((city) => (
            <MenuItem key={city.id} value={city.id}>
              {city.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
