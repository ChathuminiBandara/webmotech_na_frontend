import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import logo from "../public/assets/logo1.png";
import "../styles/Footer.scss";
import { poppins } from "../app/fonts";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className={poppins.className} id="footer">
      <Row id="footer_sec">
        <Col
          span={24}
          xxl={15}
          xl={15}
          lg={15}
          md={24}
          sm={24}
          xs={24}
          id="footer_sec_cnt_col"
        >
          <Image src={logo} alt="logo" width={100} height="auto" />
          <p>
            50 year veterans with an earned reputation for providing quality &
            healthy food delivered hot within 90 minutes.
          </p>
          <Row id="social_div">
            <Col span={8}>
              <a href="https://www.facebook.com/natreenawala/" target="_blank">
                <FaFacebookF />
              </a>
            </Col>
            <Col span={8}>
              <a href="https://www.instagram.com/natreecaterers/" target="_blank">
                <FaInstagram />
              </a>
            </Col>
            <Col span={8}>
              <a href="#" target="_blank">
                <RiTwitterXLine />
              </a>
            </Col>
          </Row>
        </Col>
        <Col
          span={24}
          xxl={3}
          xl={3}
          lg={3}
          md={24}
          sm={24}
          xs={24}
          className="footer_sec_list_col"
        >
          <h5 className="footer_sec_list_header">Home</h5>
          <h5>Shop</h5>
          <h5>Our Story</h5>
          <h5>Blog</h5>
        </Col>
        <Col
          span={24}
          xxl={6}
          xl={6}
          lg={6}
          md={24}
          sm={24}
          xs={24}
          className="footer_sec_list_col"
          id="footer_sec_contact_col"
        >
          <h5 className="footer_sec_list_header">Contact</h5>
          <h5>No 93/2 A Old Road, Nawala.</h5>
          <h5>Tel: 077 464 0909</h5>
          <h5>Email: Natreevip@gmail.com</h5>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
