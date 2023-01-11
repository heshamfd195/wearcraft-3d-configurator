import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import AssetCard from "./asset-card";
import { useScreenSize } from "../../hooks/get-screen-size";
import { useMcrPartsQuery, useTextureSliderQuery } from "../../api/queries/get-assetstore";
import { useSelector } from "react-redux";
import MaterialCard from "./material-card";




export const MaterialSlider = () => {
  const assetSliderState = useSelector(
    (state: any) => state.customizeState._assetSliderState
  );
 
  const { data, error, isLoading, isFetching, isSuccess } = useTextureSliderQuery('cowHide')

  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="">
      <Slider {...settings}>
        {isSuccess &&
          data?.map((textData:any,index:any) => {
            return (
              <MaterialCard
              textData={textData}
              />
            );
          })}
      </Slider>
    </div>
  );
};
