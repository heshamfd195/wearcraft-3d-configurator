import React, { FC } from "react";

const AssetCard: FC<any> = ({ name, id, url }) => {
  return (
    <img
      src={url}
      alt={name}
      className="mobile:w-[90%] w-[85%] bg-white"
      onClick={() => {
        console.log("part : ", id);
      }}
    ></img>
  );
};

export default AssetCard;
