// @ts-ignore
import {
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";

interface DaysWeekCheckboxProps {
  selectedDays: string[];
  onChange: (selectedDays: string[]) => void;
}

export default function DaysWeekCheckbox({
  selectedDays: propSelectedDays,
  onChange,
}: DaysWeekCheckboxProps) {
  const [internalSelectedDays, setInternalSelectedDays] =
    useState<string[]>(propSelectedDays);

  const prevSelectedDaysRef = useRef<string[]>(propSelectedDays);
  const arraysEqual = (a: string[], b: string[]) => {
    return (
      a.length === b.length && a.every((value, index) => value === b[index])
    );
  };

  //! Синхронизация внутреннего состояния с пропсами
  useEffect(() => {
    if (!arraysEqual(propSelectedDays, prevSelectedDaysRef.current)) {
      setInternalSelectedDays(propSelectedDays);
      prevSelectedDaysRef.current = propSelectedDays;
    }
  }, [propSelectedDays]);

  //! Обработка изменений чекбоксов
  const handleCheckboxChange = useCallback((day: string) => {
    setInternalSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  }, []);

  //! Отправка обновленного состояния в родительский компонент
  useEffect(() => {
    if (arraysEqual(propSelectedDays, prevSelectedDaysRef.current)) {
      onChange(internalSelectedDays);
      prevSelectedDaysRef.current = internalSelectedDays;
    }
  }, [internalSelectedDays, onChange, propSelectedDays]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        mb: "20px",
      }}
    >
      <FormGroup sx={{ display: "none" }}>
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]?.map((day) => (
          <FormControlLabel
            key={day}
            control={
              <Checkbox
                size="small"
                value={day}
                checked={internalSelectedDays.includes(day)}
                onChange={() => handleCheckboxChange(day)}
              />
            }
            label={day}
          />
        ))}
      </FormGroup>

      <Box sx={{ display: "flex", gap: "8px" }}>
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]?.map((day) => (
          <Button
            key={day}
            sx={{
              paddingY: "14px",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "20px",
              fontWeight: 500,
              backgroundColor: internalSelectedDays.includes(day)
                ? "darkgray"
                : "white",
              color: "black",
              "&:hover": {
                color: "white",
                backgroundColor: "darkblue",
              },
            }}
            onClick={() => handleCheckboxChange(day)}
          >
            {day}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

// import {
//   Box,
//   Typography,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
// } from "@mui/material";
// import { useEffect, useState, useCallback, useRef } from "react";

// interface DaysWeekCheckboxProps {
//   selectedDays: string[];
//   onChange: (selectedDays: string[]) => void;
// }

// export default function DaysWeekCheckbox({
//   selectedDays: propSelectedDays,
//   onChange,
// }: DaysWeekCheckboxProps) {
//   const [internalSelectedDays, setInternalSelectedDays] =
//     useState<string[]>(propSelectedDays);

//   const prevSelectedDaysRef = useRef<string[]>(propSelectedDays);
//   const arraysEqual = (a: string[], b: string[]) => {
//     return (
//       a.length === b.length && a.every((value, index) => value === b[index])
//     );
//   };

//   //! Синхронизация внутреннего состояния с пропсами
//   useEffect(() => {
//     if (!arraysEqual(propSelectedDays, prevSelectedDaysRef.current)) {
//       setInternalSelectedDays(propSelectedDays);
//       prevSelectedDaysRef.current = propSelectedDays;
//     }
//   }, [propSelectedDays]);

//   //! Обработка изменений чекбоксов
//   const handleCheckboxChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const day = event.target.value;
//       setInternalSelectedDays((prevDays) =>
//         prevDays.includes(day)
//           ? prevDays.filter((d) => d !== day)
//           : [...prevDays, day]
//       );
//     },
//     []
//   );

//   //! Отправка обновленного состояния в родительский компонент
//   useEffect(() => {
//     if (arraysEqual(propSelectedDays, prevSelectedDaysRef.current)) {
//       onChange(internalSelectedDays);
//       prevSelectedDaysRef.current = internalSelectedDays;
//     }
//   }, [internalSelectedDays, onChange, propSelectedDays]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "start",
//         alignItems: "center",
//         gap: "20px",
//         mb: "30px",
//         px: "15px",
//       }}
//     >
//       <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
//         {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС", "Ежедневно"]?.map((day) => (
//           <FormControlLabel
//             key={day}
//             control={
//               <Checkbox
//                 size="small"
//                 value={day}
//                 checked={internalSelectedDays.includes(day)}
//                 onChange={handleCheckboxChange}
//               />
//             }
//             label={day}
//           />
//         ))}
//       </FormGroup>
//     </Box>
//   );
// }
