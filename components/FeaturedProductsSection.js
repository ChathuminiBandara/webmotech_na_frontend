"use client";
import React from "react";
import { Row, Col } from "antd";
import "../styles/FeaturedProductsSection.scss";
import Image from "next/image";
import featuredProductSecImg from "../public/assets/featuredProductSecImg.png";

const FeaturedProductsSection = () => {
  
  return (
    <div>
      <div id="featured_products_sec">
        <Row id="featured_products_des_div">
          <Col
        
            span={24}
            xxl={{ span: 10, order: 1 }}
            xl={{ span: 10, order: 1 }}
            lg={{ span: 13, order: 1 }}
            md={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            xs={{ span: 24, order: 2 }}
          >
            <Image
              id="featured_product_sec_img"
              src={featuredProductSecImg}
              alt="image"
              width="auto"
              height={400}
            />
          </Col>
          <Col
         
            span={24}
            xxl={{ span: 10, order: 1 }}
            xl={{ span: 10, order: 2 }}
            lg={{ span: 11, order: 2 }}
            md={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            xs={{ span: 24, order: 1 }}
          >
            <h2>Featured Products</h2>
            <p>
              Elevate your meals with locally sourced veggies, supporting
              community farmers. From vibrant salads to soul-warming soups,
              discover healthy cooking made easy.
            </p>
            <p>
              Elevate your meals with locally sourced veggies, supporting
              community farmers. From vibrant salads to soul-warming soups,
              discover healthy cooking made easy.
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FeaturedProductsSection;
