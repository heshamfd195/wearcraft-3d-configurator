import React from "react";
import { StageButton } from "../../ui-components/core/buttons/StageButton";
import { useNavigate } from "react-router-dom";

function Preview() {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-screen h-screen">
      <div className="absolute bottom-0 left-0 w-1/4">
        <StageButton
          name="Back"
          back
          size="lg"
          textSize="2xl"
          onClick={onBack}
        />
      </div>
    </div>
  );
}

export default Preview;
