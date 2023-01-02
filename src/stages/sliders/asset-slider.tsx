import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import AssetCard from "./card";
import { useScreenSize } from "../../hooks/get-screen-size";

const data = [
  {
    name: "front",
    id: "crm-fr-L1D4",
    url: "/assets/fronts/crm-fr-L1D4.png",
  },
  {
    name: "front",
    id: "crm-fr-L1D5",
    url: "/assets/fronts/crm-fr-L1D5.png",
  },
  {
    name: "front",
    id: "crm-fr-L1D6",
    url: "/assets/fronts/crm-fr-L1D6.png",
  },
  {
    name: "front",
    id: "crm-fr-L2D1",
    url: "/assets/fronts/crm-fr-L2D1.png",
  },
  {
    name: "front",
    id: "crm-fr-L5D1",
    url: "/assets/fronts/crm-fr-L5D1.png",
  },
  {
    name: "front",
    id: "crm-fr-L4D1",
    url: "/assets/fronts/crm-fr-L4D1.png",
  },
];
export const AssetSlider = () => {
  const {isMobile}=useScreenSize()

  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: isMobile ?3:5,
    slidesToScroll: 3,
  };

  return (
    <div className="">
      <Slider {...settings} >
        { data?.map((part:any,index:number)=>{
          return <AssetCard name={part.name} id={part.id}  url={part.url} key={index}/>
        })}
      </Slider>
    </div>
  );
};
