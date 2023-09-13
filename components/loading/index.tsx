// LoadingComponent.js
import React from "react";
import ReactLoading from "react-loading";

interface LoadingComponentProps {
  type: "blank" | "balls" | "bars" | "bubbles" | "cubes" | "cylon" | "spin" | "spinningBubbles" | "spokes";
  color: string;
}

const LoadingComponent = ({ type, color }: LoadingComponentProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ReactLoading type={type} color={color} width={100} height={100} />
    </div>
  );
};

export default LoadingComponent;
