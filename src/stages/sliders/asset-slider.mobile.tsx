import React, { Component } from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css"

export const AssetSliderM=()=> {


 
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      
     
    }

    return (
      <div className="">
        <Slider {...settings}>
          <div className="bg-red-500 h-40 w-20">
            <h3>1</h3>
          </div>
          <div className="bg-blue-300 h-40 w-20">
            <h3>2</h3>
          </div>
          <div className="bg-blue-300 h-40 w-20">
            <h3>3</h3>
          </div>
          <div className="bg-blue-300 h-40 w-20">
            <h3>4</h3>
          </div>
   
      
        </Slider>
      </div>
    );
  }
