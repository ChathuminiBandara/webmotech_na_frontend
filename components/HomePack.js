"use client"
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import "../styles/HomePack.scss";
import {Col, Row, Button, Carousel} from "antd";
import ownPackImg from "../public/assets/ownPackImg.png";
import Image from "next/image";
import {FaArrowRight} from "react-icons/fa6";
import {poppins} from "../app/fonts";
import FamilyPackCard from "./cards/FamilyPackCard";
import ContactUs from './modals/ContactUs'
import * as packageService from '../service/packageService'
import {setLoading} from "../redux/actions/loadingActions";

const HomePack = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
    const [familyPackCardData, setFamilyPackCardData] = useState([]);

    useEffect(() => {
        loadFamilyPackage();
    }, []);

    const loadFamilyPackage = () => {
        dispatch(setLoading(true));
        packageService.loadLimitedPackagesList().then(res => {
            let temp = []
            res.data.map((pack, index) => {
                let discountedPrice = pack.price - ((pack.price / 100) * pack.discount)

                temp.push({
                    id: pack.id,
                    title: `${pack.name} (${pack.person_count} Person)`,
                    category: pack.title,
                    price: pack.price,
                    isDiscountedPackage: pack.discount > 0,
                    imageUrl: pack.files[0].file.path,
                    discountedPrice: discountedPrice,
                    data: pack
                })
            })
            setFamilyPackCardData(temp);
            dispatch(setLoading(false));
        }).catch(c => {
            dispatch(setLoading(false));
        })
    }

    const toggleContactUsModal = () => {
        setIsContactUsModalOpen(!isContactUsModalOpen);
    };

    return (
        <div className={poppins.className}>
            <ContactUs isOpen={isContactUsModalOpen} toggleModal={toggleContactUsModal}/>
            <div id="home_pack_sec_div">
                <Row id="home_pack_sec_cnt">
                    <Col span={24} xxl={15} xl={15} lg={15} md={24} sm={24} xs={24} id="family_pack_col">
                        <h4 id="home_pack_sec_heading">Collect Your Home Pack</h4>
                        <Row id="home_pack_card_div">
                            <Carousel
                                autoplay
                                autoplaySpeed={10000}
                                slidesToShow={4}
                                infinite
                                id="family_pack_carousel"
                                style={{height: "100%"}}
                                responsive={[
                                    {
                                        breakpoint: 2560,
                                        settings: {
                                            slidesToShow: 3,
                                        },
                                    },
                                    {
                                        breakpoint: 1700,
                                        settings: {
                                            slidesToShow: 3,
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
                                            slidesToShow: 3,
                                        },
                                    },
                                    {
                                        breakpoint: 729,
                                        settings: {
                                            slidesToShow: 2,
                                        },
                                    },
                                    {
                                        breakpoint: 520,
                                        settings: {
                                            slidesToShow: 1,
                                        },
                                    },
                                ]}
                            >

                                {!isLoading && familyPackCardData.map((card, index) => (
                                    <Col key={index} span={24} className="family_pack_carousel_col">
                                        <FamilyPackCard
                                            data={card}
                                            direction={'HOME'}
                                        />
                                    </Col>
                                ))}


                            </Carousel>
                        </Row>
                    </Col>
                    <Col span={24} xxl={9} xl={9} lg={9} md={18} sm={24} xs={24} id="own_pack_col">
                        <div id="own_pack_card">
                            <Image alt="=" src={ownPackImg}/>
                            <div id="own_pack_card_des_div">
                                <h3>Make Your Own Pack</h3>
                                <p>
                                    Fresh from the farm to your door. Explore vibrant produce,
                                    quality guaranteed, for a culinary experience like no other.
                                </p>
                                <Button type="button" id="own_pack_card_btn" onClick={toggleContactUsModal}>
                                    Shop Now
                                    <FaArrowRight style={{padding: "0 0 0 12px"}}/>{" "}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default HomePack;
