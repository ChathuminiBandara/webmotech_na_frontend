"use client"
import React from "react";
import { useEffect } from "react";
import FamilyPackCard from "./cards/FamilyPackCard";
import { Col, Row, Button, Carousel } from "antd";
import "../styles/WhyWeBestSection.scss";
import { poppins } from "../app/fonts";
import Image from "next/image";
import wwbImage from "../public/assets/whyWeBestImg.png";
import wwbLableImg01 from "../public/assets/wwb_lable01.png";
import wwbLableImg02 from "../public/assets/wwb_lable02.png";
import wwbLableImg03 from "../public/assets/wwb_lable03.png";

import { BsHeartPulse } from "react-icons/bs";
import { GiThreeLeaves } from "react-icons/gi";
import { GiTreeBranch } from "react-icons/gi";
import { FaAward } from "react-icons/fa6";
import { GiFruiting } from "react-icons/gi";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyWeBestSection = () => {
  useEffect(() => {
    // AOS.init({ once: true });
    AOS.init({});
  }, []);
  return (
    <div className={poppins.className}>
      <Row id="why_we_best_sec">
        <Row id="wwb_sec_heading_col">
          <h3>Why We are Best</h3>
          <p>
            Fresh from the farm to your door. Explore vibrant produce, quality
            guaranteed, for a culinary experience like no other.
          </p>
        </Row>
        <Row id="wwb_sec_cnt_col">
          <Image
            src={wwbImage}
            alt="image"
            width={460}
            height="auto"
            id="wwb_sec_img"
          />
          <Row
            data-aos="zoom-in-left"
            data-aos-easing="linear"
            data-aos-duration="800"
            id="wwb_sec_cnt_card_01"
            className="wwb_cnt_cards"
          >
            <Col span={5} className="wwb_cnt_card_icon">
              <GiFruiting />
            </Col>
            <Col span={19} className="wwb_cnt_card_des">
              <h3>01.</h3>
              <h5>Always Fresh</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </p>
            </Col>
          </Row>
          <Row
            data-aos="zoom-in-right"
            data-aos-easing="linear"
            data-aos-duration="800"
            id="wwb_sec_cnt_card_02"
            className="wwb_cnt_cards"
          >
            <Col span={5} className="wwb_cnt_card_icon">
              <BsHeartPulse />
            </Col>
            <Col span={19} className="wwb_cnt_card_des">
              <h3>02.</h3>
              <h5>Super Healthy</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </p>
            </Col>
          </Row>
          <Row
            data-aos="zoom-in-left"
            data-aos-easing="linear"
            data-aos-duration="800"
            id="wwb_sec_cnt_card_03"
            className="wwb_cnt_cards"
          >
            <Col span={5} className="wwb_cnt_card_icon">
              <FaAward />
            </Col>
            <Col span={19} className="wwb_cnt_card_des">
              <h3>03.</h3>
              <h5>Premium Quality</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </p>
            </Col>
          </Row>
          <Row
            data-aos="zoom-in-right"
            data-aos-easing="linear"
            data-aos-duration="800"
            id="wwb_sec_cnt_card_04"
            className="wwb_cnt_cards"
          >
            <Col span={5} className="wwb_cnt_card_icon">
              <GiThreeLeaves />
            </Col>
            <Col span={19} className="wwb_cnt_card_des">
              <h3>04.</h3>
              <h5>100% Natural</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </p>
            </Col>
          </Row>
        </Row>
        <Row id="wwb_sec_lable_col">
          <Col span={24} xxl={7} xl={7} lg={8} md={24} sm={24} xs={24} className="wwb_lables_col">
            <Row className="wwb_cnt_lables">
              <Col span={7} className="wwb_lables_img_div">
                <Image
                  src={wwbLableImg01}
                  alt="lable Img"
                  width={56}
                  height="auto"
                />
              </Col>
              <Col span={17} className="wwb_lables_des_div">
                <h3>Best Prices & Deals</h3>
                <p>Don’t miss our daily amazing deals and prices</p>
              </Col>
            </Row>
          </Col>
          <Col span={24} xxl={7} xl={7} lg={8} md={24} sm={24} xs={24} className="wwb_lables_col">
            <Row className="wwb_cnt_lables">
              <Col span={7} className="wwb_lables_img_div">
                <Image
                  src={wwbLableImg02}
                  alt="lable Img"
                  width={56}
                  height="auto"
                />
              </Col>
              <Col span={17} className="wwb_lables_des_div">
                <h3>Refundable </h3>
                <p>If your items have damage we agree to refund it</p>
              </Col>
            </Row>
          </Col>
          <Col span={24} xxl={7} xl={7} lg={8} md={24} sm={24} xs={24} className="wwb_lables_col">
            <Row className="wwb_cnt_lables">
              <Col span={7} className="wwb_lables_img_div">
                <Image
                  src={wwbLableImg03}
                  alt="lable Img"
                  width={56}
                  height="auto"
                />
              </Col>
              <Col span={17} className="wwb_lables_des_div">
                <h3>Free delivery</h3>
                <p>Do purchase over $50 and get free delivery anywhere</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default WhyWeBestSection;
