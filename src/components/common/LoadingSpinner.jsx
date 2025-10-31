import React from "react";
import { RotatingLines } from "react-loader-spinner";

import '../common/LoadingProvider.jsx'


const LoadingSpinner = () => {
  return (
    <div id="loading-spinner">
      <RotatingLines
        strokeColor="#ff48ab"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
