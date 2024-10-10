// @ts-ignore
import React from "react";

import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";

import "./css/embla.css";

interface SliderProps {
  images: string[];
  options?: EmblaOptionsType;
  loop?: boolean;
  Tour_category: string;
}

const Slider: React.FC<SliderProps> = ({
  images,
  options,
  loop = true,
  Tour_category,
}) => {
  const carouselOptions: EmblaOptionsType = {
    ...(options || {}),
    loop,
  };

  return (
    <EmblaCarousel
      slides={images}
      options={carouselOptions}
      Tour_category={Tour_category}
    />
  );
};

export default Slider;
