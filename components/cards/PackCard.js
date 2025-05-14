"use client"
import React, {useState} from "react";
import "../../styles/PackCard.scss";
import {Col, Row, Button} from "antd";
import {FaArrowRight} from "react-icons/fa6";
import {quicksand} from "../../app/fonts";
import Image from "next/image";
import CheckLocation from "../modals/CheckLocation";
import {ArrowRight} from "react-feather";

const PackCard = ({
                      title,
                      description,
                      imageUrl,
                      offer,
                      buttonCnt,
                      btnColor,
                      lableColor,
                      bgColor,
                  }) => {
    const [isCheckLocationModalOpen, setIsCheckLocationModalOpen] = useState(false);
    const toggleCheckLocationModal = () => {
        setIsCheckLocationModalOpen(!isCheckLocationModalOpen);
    };


    return (
        <div className={quicksand.className} style={{margin: "15px 15px"}}>
            <CheckLocation
                isOpen={isCheckLocationModalOpen}
                toggleModal={toggleCheckLocationModal}
            />
            <Row className="pack_card_div" style={{backgroundColor: bgColor}}>
                <Col
                    span={12}
                    xxl={{span: 15, order: 1}}
                    xl={{span: 12, order: 1}}
                    lg={{span: 12, order: 1}}
                    md={{span: 12, order: 1}}
                    sm={{span: 24, order: 2}}
                    xs={{span: 24, order: 2}}
                    className="pack_card_des_div"
                >
                    <Row className="pack_card_des_cnt">
                        <div
                            className="pack_card_des_offer_div"
                            style={{backgroundColor: lableColor}}
                        >
                            {offer}
                        </div>
                        <div className="pack_card_des_detail_div">
                            <h3>{title}</h3>
                            <h5>{description}</h5>
                        </div>
                        <Button
                            type="button"
                            className="pack_card_des_btn"
                            style={{backgroundColor: btnColor}}
                            onClick={toggleCheckLocationModal}
                        >
                            {buttonCnt}
                            <ArrowRight style={{margin: "0 0 0 12px"}}/>{" "}
                        </Button>
                    </Row>
                </Col>
                <Col
                    span={12}
                    xxl={{span: 9, order: 2}}
                    xl={{span: 12, order: 2}}
                    lg={{span: 12, order: 2}}
                    md={{span: 12, order: 2}}
                    sm={{span: 24, order: 1}}
                    xs={{span: 24, order: 1}}
                    className="pack_card_img_div"
                >
                    <Image
                        className="pack_card_img"
                        src={imageUrl}
                        alt="Description of the image"
                        width={300}
                        height={300}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default PackCard;
