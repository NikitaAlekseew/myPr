// @ts-ignore
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ru } from "date-fns/locale";

import "./Calendar.scss";

interface CalendarProps {
  onDateSelect: (date: Date | undefined) => void;
  disabledWeeks: (
    | {
        before: Date;
        dayOfWeek?: undefined;
      }
    | {
        dayOfWeek: number[];
        before?: undefined;
      }
  )[];
}

export function Calendar({ onDateSelect, disabledWeeks }: CalendarProps) {
  const [selected, setSelected] = useState<Date>();

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);
    onDateSelect(date);
  };

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      locale={ru}
      disabled={disabledWeeks}
      // footer={
      //   selected
      //     ? `Выбрано: ${selected.toLocaleDateString("ru-RU")}`
      //     : "Выберите день."
      // }
    />
  );
}
