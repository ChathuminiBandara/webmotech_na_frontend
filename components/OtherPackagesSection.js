import React from "react";
import { poppins } from "../app/fonts";
import { Row, Col } from "antd";
import FamilyPackCard from "./cards/FamilyPackCard";
import "../styles/OtherPackagesSection.scss";

const OtherPackagesSection = () => {
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
      title: "Family Pack (1 Person)",
      category: "Vegetables",
      price: "RS.650.00",
      imageUrl: "/assets/familyPack.png",
    },
    {
      id: 4,
      title: "Family Pack (2 Person)",
      category: "Vegetables",
      price: "RS.1300.00",
      imageUrl: "/assets/familyPack.png",
    },
  ];
  return (
    <div className={poppins.className}>
      <Row id="other_packages_cnt_sec">
        <div id="other_packages_cnt_div">
          <h4 id="op_cnt_sec_heading">Other Packages</h4>
          <Row id="op_cnt_sec_products">
            {familyPackCardData.map((card) => (
              <Col
                span={24}
                xxl={4}
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={24}
                className="op_cnt_sec_products_col"
              >
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

export default OtherPackagesSection;
