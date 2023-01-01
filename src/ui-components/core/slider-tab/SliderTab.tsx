import React, { useState } from "react";

interface SliderTabProps{
  tabs:any;
  n:number;
  className?:string

}

const SliderTab: React.FC<SliderTabProps> = ({tabs,n,className}) => {
  // const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex space-x-8 text-2xl font-semibold px-2 ">
      {tabs.map((tab: any, i: number) => {
        return (
          <div
            className={`${className} py-2 border-b-[6px] transition-colors duration-100 ${
              i === n
                ? "border-primary-dark text-primary-dark"
                : ' border-bar-transparent text-primary-main'
            }`}
            key={i}
            // onClick={() => {
            //   setActiveTab(i);
            // }}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
};

export default SliderTab;