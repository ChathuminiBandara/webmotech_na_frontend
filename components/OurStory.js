import React from "react";
import "../styles/OurStory.scss";
import { poppins } from "../app/fonts";
import Image from "next/image";
import sideImg from "../public/assets/ourStorySideImg.png";
import { Col, Row } from "antd";
const OurStory = () => {
  return (
    <div id="our_story" className={poppins.className}>
      <div id="our_story_sec">
        <div id="our_story_sec_bg">
          <div className="our_story_sec_cnt_div">
            <h1>
              Delightful Culinary
              <span style={{ color: "#FFB92C" }}> Journeys </span>Delivered to
              Your
              <span style={{ color: "#FFB92C" }}> Doorstep</span>!
            </h1>
            <h5>
              Fresh from the farm to your door. Explore vibrant produce, quality
              guaranteed, for a culinary experience like no other.
            </h5>
          </div>
          <div id="our_story_image_div">
            <div id="our_story_man_img"></div>
            <div id="our_story_arrow_img"></div>
          </div>
        </div>
      </div>

      <Row id="our_story_cnt_sec">
        <div id="our_story_cnt">
          <h2>Our Story</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <p>
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>

        <Image id="our_story_side_img" src={sideImg} height={520} width={200} />
      </Row>
    </div>
  );
};

export default OurStory;
