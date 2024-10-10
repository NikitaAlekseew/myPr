// @ts-ignore
import React from "react";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";

import { createTheme, ThemeProvider, Typography } from "@mui/material";

import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

const theme = createTheme({
  typography: {
    fontFamily: "Geologica, Arial, sans-serif",
  },
});

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
  Tour_category: string;
};

const EmblaCarousel: React.FC<PropType> = ({
  slides,
  options,
  Tour_category,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <ThemeProvider theme={theme}>
      <section className="embla-guide">
        <div className="embla__controls-guide">
          <Typography
            sx={{
              padding: "5px 10px",
              border: `1px solid ${
                Tour_category === "Автобусная экскурсия" ? "#1E2D9A" : "#DA251C"
              }`,
              borderRadius: "10px",
              fontWeight: "300",
              fontSize: "16px",
              background: "white",
            }}
          >
            {Tour_category}
          </Typography>
          <div className="embla__buttons-guide">
            <PrevButton
              className="embla__button-guide"
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              className="embla__button-guide"
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
        <div className="embla__viewport-guide" ref={emblaRef}>
          <div className="embla__container-guide">
            {slides?.map((image, index) => (
              <div className="embla__slide-guide" key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default EmblaCarousel;
