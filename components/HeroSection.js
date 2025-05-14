import React from "react";
import "../styles/HeroSection.scss";
import bgImg from "../public/assets/HeroSecBg.png";
import { poppins } from "../app/fonts";
const HeroSection = () => {
  return (
    <>
      <div id="hero_sec_div" className={poppins.className}>
      <div id="hero_sec_div_bg">
        <div className="hero_sec_cnt_div">
          <h1>
            Farm <span style={{ color: "#FFB92C" }}>Fresh</span> Delivered to
            Your <span style={{ color: "#FFB92C" }}>Doorstep</span>
          </h1>
          <h5>
            Fresh from the farm to your door. Explore vibrant produce, quality
            guaranteed, for a culinary experience like no other.
          </h5>
        </div>
        <div id="image_div">
            <div id="hero_sec_phone_img"></div>
            <div id="hero_sec_arrow_img"></div>
            <div id="hero_sec_veggebag_img"></div>
        </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
