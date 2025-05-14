import React from "react";
import { poppins } from "../app/fonts";
import { Row, Col } from "antd";
import "../styles/ProductPage.scss";
import FamilyPackCard from "./cards/FamilyPackCard";
const ProductPage = () => {
  const familyPackCardData = [
    {
      id: 1,
      title: "Family Pack (1 Person)",
      category: "Vegetables",
      price: "RS.650.00",
      imageUrl: "/assets/familyPack.png",
    },
    {
      id: 2,
      title: "Family Pack (2 Person)",
      category: "Vegetables",
      price: "RS.1300.00",
      imageUrl: "/assets/familyPack.png",
    },
    {
      id: 3,
      title: "Family Pack (4 Person)",
      category: "Vegetables",
      price: "RS.2600.00",
      imageUrl: "/assets/familyPack.png",
    },
    {
      id: 4,
      title: "Family Pack (1 Person)",
      category: "Vegetables",
      price: "RS.650.00",
      imageUrl: "/assets/familyPack.png",
    },
    {
      id: 5,
      title: "Family Pack (2 Person)",
      category: "Vegetables",
      price: "RS.1300.00",
      imageUrl: "/assets/familyPack.png",
    },
  ];
  return (
    <div className={poppins.className}>
      <Row id="product_page_hero_sec">
        <div id="product_page_hero_sec_bg">
          <div className="pp_hero_sec_cnt_div">
            <h1>
              Unveil Freshness with '
              <span style={{ color: "#FFB92C" }}>Pick Your Veggie Pack</span>'!
            </h1>
            <h5>
              Discover freshness with 'Pick Your Veggie Pack'! Elevate your
              plate with locally sourced veggies, creating a flavorful,
              customized culinary experience
            </h5>
          </div>
          <div id="pp_hero_sec_image_div">
            <div id="arrow_img"></div>
            <div id="man_img"></div>
          </div>
        </div>
      </Row>
      <Row id="product_page_cnt_sec">
        <div id="product_page_cnt_div">
          <h4 id="pp_cnt_sec_heading">Collect Your Home Pack</h4>
          <Row id="pp_cnt_sec_products">
            {familyPackCardData.map((card) => (
              <Col span={24} xxl={4} xl={6} lg={6} md={12} sm={12} xs={24} className="pp_cnt_sec_products_col">
                <FamilyPackCard
                  key={card.id}
                  title={card.title}
                  category={card.category}
                  price={card.price}
                  imageUrl={card.imageUrl}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default ProductPage;
