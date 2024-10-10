// @ts-ignore
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TourImage {
  id: number;
  image: string;
}

interface Tour {
  amount: string;
  id: number;
  city: string;
  title: string;
  content: string;
  cost: string;
  duration: string;
  schegule: string;
  start_time: string;
  Tour_images: TourImage[];
  category: string;
}

interface EditTourState {
  editableTour: Tour | null;
}

const initialState: EditTourState = {
  editableTour: null,
};

const editTourSlice = createSlice({
  name: "editTour",
  initialState,
  reducers: {
    setEditableTour: (state, action: PayloadAction<Tour>) => {
      state.editableTour = action.payload;
    },
    clearEditableTour: (state) => {
      state.editableTour = null;
    },
  },
});

export const { setEditableTour, clearEditableTour } = editTourSlice.actions;
export default editTourSlice.reducer;
