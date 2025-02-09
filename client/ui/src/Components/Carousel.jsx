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
    <div className="w-full overflow-hidden">
      <div className="w-full max-w-4xl mx-auto mt-10 px-4">
        <Slider {...settings}>
          {/* Slide 1 */}
          <div>
            <img
              src="../assets/Images/slide1.png"
              alt="Slide 1"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Slide 2 */}
          <div>
            <img
              src="https://via.placeholder.com/800x400?text=Slide+2"
              alt="Slide 2"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Slide 3 */}
          <div>
            <img
              src="https://via.placeholder.com/800x400?text=Slide+3"
              alt="Slide 3"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}
