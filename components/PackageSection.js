"use client"
import React, {useState} from "react";
import "../styles/PackageSection.scss";
import PackCard from "./cards/PackCard";
import {Carousel, Row, Col} from "antd";
 
const PackageSection = () => {

    const packageCardData = [
        {
            id: 1,
            title: "Veggie Pack",
            description: "Save up to 60% off on your first order",
            offer: "60% off",
            buttonCnt: "Order Now",
            imageUrl: "/assets/packageImg04.png",
            btnColor: "#60B24C",
            lableColor: "#7abf6d",
            bgColor: "#D2EFE1",
        },
        {
            id: 2,
            title: "Create Own Pack",
            description: "Shop $50 product and get free delivery anywhre.",
            offer: "Free delivery",
            buttonCnt: "Shop Now",
            imageUrl: "/assets/packageImg02.png",
            btnColor: "#FFB92C",
            lableColor: "#FFD480",
            bgColor: "#FFF5E1",
        },
        {
            id: 3,
            title: "Veggie Pack",
            description: "Save up to 60% off on your first order",
            offer: "60% off",
            buttonCnt: "Order Now",
            imageUrl: "/assets/packageImg04.png",
            btnColor: "#60B24C",
            lableColor: "#7abf6d",
            bgColor: "#D2EFE1",
        },
        {
            id: 4,
            title: "Create Own Pack",
            description: "Shop $50 product and get free delivery anywhre.",
            offer: "Free delivery",
            buttonCnt: "Shop Now",
            imageUrl: "/assets/packageImg02.png",
            btnColor: "#FFB92C",
            lableColor: "#FFD480",
            bgColor: "#FFF5E1",
        },
    ];


    return (
        <Row id="package_section_div">

            <Carousel
                autoplay
                autoplaySpeed={10000}
                slidesToShow={2}
                infinite
                id="package_section_carousel"
                responsive={[
                    {
                        breakpoint: 2500,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 1130,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 660,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ]}
            >
                {packageCardData.map((card) => (
                    <Col key={card.id} className={"carousel_col"} span={24}
                         style={{height: "100%", backgroundColor: "red"}}>

                        <PackCard
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            imageUrl={card.imageUrl}
                            offer={card.offer}
                            buttonCnt={card.buttonCnt}
                            btnColor={card.btnColor}
                            lableColor={card.lableColor}
                            bgColor={card.bgColor}
                        />
                    </Col>

                ))}
            </Carousel>


        </Row>
    );
};

export default PackageSection;
