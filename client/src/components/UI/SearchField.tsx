// @ts-ignore
import { useEffect, useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";

import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface City {
  id: string;
  title: string;
}

export default function SearchField() {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/data/cities`
        );
        setCities(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setError("Не удалось загрузить данные.");
      }
    };

    fetchCities();
  }, []);

  const handleClear = () => {
    setInputValue("");
  };

  const handleSelectCity = (event, value) => {
    if (value) {
      navigate(`/city/${value}`);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <Stack spacing={2} sx={{ width: "50%" }}>
        <Autocomplete
          options={cities?.map((city) => city.title)}
          inputValue={inputValue}
          onInputChange={(_event, newValue) => setInputValue(newValue)}
          onChange={handleSelectCity}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Поиск"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    {inputValue ? (
                      <IoCloseOutline
                        style={{ fontSize: 20, cursor: "pointer" }}
                        onClick={handleClear}
                      />
                    ) : (
                      <IoSearchOutline style={{ fontSize: 20 }} />
                    )}
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: 0,
                  borderRadius: "8px",
                  paddingLeft: "6px !important",
                  paddingRight: "13px !important",
                },
                "& .MuiInputLabel-root": {
                  transform: "translateX(13px) translateY(8px) scale(1)",
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translateX(13px) translateY(-8px) scale(0.75)",
                },
              }}
            />
          )}
        />
      </Stack>
    </>
  );
}
