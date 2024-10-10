// import React, { useEffect, useState } from "react";
// import { EmblaOptionsType } from "embla-carousel";
// import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
// import {
//   PrevButton,
//   NextButton,
//   usePrevNextButtons,
// } from "./EmblaCarouselArrowButtons";
// import useEmblaCarousel from "embla-carousel-react";
// import ProductCard from "../Card/ProductCard";
// import { Tour } from "../MainPage/MainPage";

// type PropType = {
//   slides: number[];
//   options?: EmblaOptionsType;
//   tours: Tour[];
//   setTours: React.Dispatch<React.SetStateAction<Tour[]>>;
// };

// const EmblaCarousel: React.FC<PropType> = (props) => {
//   const { slides, options } = props;
//   const [emblaRef, emblaApi] = useEmblaCarousel(options);

//   const { selectedIndex, scrollSnaps, onDotButtonClick } =
//     useDotButton(emblaApi);

//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   } = usePrevNextButtons(emblaApi);

//   const handleRemoveTour = (id: number) => {
//     props.setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
//   };

//   return (
//     <section className="embla">
//       <div className="embla__viewport" ref={emblaRef}>
//         <div className="embla__container">
//           {props.tours?.map((tour) => (
//             <div className="embla__slide" key={tour.id}>
//               <ProductCard
//                 {...tour}
//                 onLiked={() => handleRemoveTour(tour.id)}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="embla__controls">
//         <div className="embla__buttons">
//           <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
//           <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
//         </div>

//         <div className="embla__dots">
//           {scrollSnaps?.map((_, index) => (
//             <DotButton
//               key={index}
//               onClick={() => onDotButtonClick(index)}
//               className={"embla__dot".concat(
//                 index === selectedIndex ? " embla__dot--selected" : ""
//               )}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EmblaCarousel;

// @ts-ignore

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "../Card/ProductCard";
import { Tour } from "../MainPage/MainPage";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  tours: Tour[];
  setTours: React.Dispatch<React.SetStateAction<Tour[]>>;
  favoriteButtonViewNone?: boolean 
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const handleRemoveTour = (id: number) => {
    props.setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
  };
  console.log("Tours:", props.tours);
  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          
          {props.tours?.map((tour) => 
           ( <div className="embla__slide" key={tour.id}>
              <ProductCard {...tour}  onLiked={() => handleRemoveTour(tour.id)} favoriteButtonViewNone={props.favoriteButtonViewNone}/>
            </div>) )}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <div className="embla__dots">
            {scrollSnaps?.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
