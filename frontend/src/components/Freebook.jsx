import React from "react";
import list from "../assets/list.json";
import Slider from "react-slick";
import Card from "./Card"; 

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Freebook = () => {
  const filterData = list.filter((data) => data.category === "Free");

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <>
      <div>
        <h1>Read for Free</h1>
        <p>
          Dive into our collection of free books, carefully curated to spark curiosity and
          fuel your learning journey. Whether you’re looking to expand your knowledge,
          discover new stories, or simply enjoy a good read, this section gives you unlimited
          access at no cost. Start exploring and let every page inspire you!
        </p>
      </div>

      <div>
        <Slider {...settings}>
          {filterData.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Freebook;
