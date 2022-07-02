import React from "react";
//import * as images from "../../assets/svg/";
function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context("../../assets/svg", false, /\.svg$/));

const WeatherImg = ({ summary }) => {
  const images1 = images.filter(
    (image) => image.split(".")[0].split("/")[3] === summary
  );
  return (
    <div>
      <img src={images1} alt={images1} width="80" height="80" className="" />
    </div>
  );
};

export default WeatherImg;
