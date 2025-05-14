import React, {useEffect, useState} from "react";
import "../../styles/CategoryCard.scss";
import Image from "next/image";

import {quicksand} from "../../app/fonts";

import Cookies from "js-cookie";

import {useRouter} from 'next/navigation';
import {Avatar, Tooltip} from "antd";
import {UpCircleOutlined} from "@ant-design/icons";

const CategoryCard = ({data, vegetableType}) => {


    let router = null;

    if (typeof window === 'undefined') {
        return null;
    } else {
        router = useRouter()
    }


    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
    const toggleContactUsModal = () => {
        setIsContactUsModalOpen(!isContactUsModalOpen);
    };
    const [isOpen, setIsOpen] = useState(false)
    const [eligible, setEligible] = useState(false);

    useEffect(() => {
        setEligible(Cookies.get("Eligible"))
    }, [isOpen]);


    const toggleModal = (dir) => {

        if (dir === 'map' && isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(!isOpen)
        }

        if (dir) {
            openAgainModal(dir)
        }

    }

    const openAgainModal = (dir) => {
        setIsOpen(true)
        setEligible(true)
    }

    const openModal = (dir) => {

    }
    console.log(data)
    return (

        <div style={{cursor: 'pointer', borderBottom: `${data?.categoryColor}`}} onClick={() => {
            router.push(`/product-view/${vegetableType.toLowerCase()}/${data.data.slug}`)
        }} className={quicksand.className}
             id={"categoryCard"}>

            <div style={{borderBottom: `${data?.categoryColor} 4px solid`}} className={"category_wrapper"}>
                <Image
                    alt="d"
                    src={data?.imageUrl}
                    width={300}
                    height={100}
                    className="category-img"
                />
                {/*<span style={{backgroundColor: data?.categoryColor}}*/}
                {/*      className={'category-badge'}>{data?.tag === undefined ? 'AA' : data?.tag}</span>*/}
                <div className="category-desc">
                    <h5>{data?.category}</h5>
                    <h4 onClick={() => {
                        router.push(`/product-view/${vegetableType.toLowerCase()}/${data.data.slug}`)
                    }} className='prod-title'>
                        {data?.title}
                    </h4>
                    <p className="priceRange">
                        {data.minPrice} <small style={{color: '#4fa43a'}}> Upto <UpCircleOutlined
                        style={{color: '#4fa43a'}}/></small>
                    </p>

                </div>

            </div>

        </div>

    );
};

export default CategoryCard;
