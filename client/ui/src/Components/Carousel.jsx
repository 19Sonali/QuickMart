import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AutoCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000, // 10 seconds
    arrows: false,
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Slider {...settings} className="w-full h-full">
        {/* Slide 1 */}
        <div className="w-screen h-screen">
          <img
            src="./Images/slide1.png"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Slide 2 */}
        <div className="w-screen h-screen">
          <img
            src="https://via.placeholder.com/1920x1080?text=Slide+2"
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Slide 3 */}
        <div className="w-screen h-screen">
          <img
            src="https://via.placeholder.com/1920x1080?text=Slide+3"
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </div>
      </Slider>
    </div>
  );
}
