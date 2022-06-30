import React from "react";
//import * as images from "../../assets/svg/";
function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context("../../assets/svg", false, /\.svg$/));

const WeatherImg = ({ summary }) => {
  const image = images.filter((image) => image.includes(summary));
  console.log(image);
  return (
    <div>
      <img src={image} alt={image} width="80" height="80" />
    </div>
  );
};

export default WeatherImg;
