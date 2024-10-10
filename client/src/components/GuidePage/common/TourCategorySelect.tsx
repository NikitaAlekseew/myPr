// @ts-ignore
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";

const tourCategorySelectStyles = {
  borderRadius: "10px",
  background: "white",
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

interface Category {
  id: string;
  title: string;
}

interface TourCategorySelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

export default function TourCategorySelect({
  value,
  onChange,
}: TourCategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${import.meta.env.VITE_SERVER_URL}/data/tours/categories`
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError("Ошибка при загрузке данных.");
        setLoading(false);
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Box>Загрузка...</Box>;
  }

  if (error) {
    return <Box>{error}</Box>;
  }

  return (
    <Box sx={{ flex: 1 }}>
      <FormControl fullWidth sx={tourCategorySelectStyles}>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={value}
          label="Выберите категорию тура"
          onChange={onChange}
          sx={{ paddingY: "0", fontSize: "20px" }}
        >
          <MenuItem value="" disabled>
            Выберите категорию тура
          </MenuItem>
          {categories?.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
