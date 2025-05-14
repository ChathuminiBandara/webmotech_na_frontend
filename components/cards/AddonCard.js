"use client"
import {Button, Card, Col, Row} from "antd";
import React, {useEffect, useState} from 'react'
import '../../styles/AddonCard.scss'
import Image from 'next/image'
import {formatPrice} from "@/util/CommonFun";
import {DoubleRightOutlined} from "@ant-design/icons";
import discountStar from "@/public/assets/discount_start.png";
import AddonModal from "@/components/modals/AddonModal";

const AddonCard = ({getAddonQTyAndDetails, details, packageType}) => {

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [addOnProductDetails, setAddonProductDetails] = useState([])

    useEffect(() => {

        getAddonQTyAndDetails(addOnProductDetails)
    }, [addOnProductDetails]);


    const setOpenAddon = () => {
        setIsOpenModal(!isOpenModal)
    }
    const getAddonData = (data) => {
        setIsOpenModal(!isOpenModal)
        console.log(data)
        setAddonProductDetails({
            ...data,
            id: details.id,
            name: details.name,
            image: details.files?.filter(image => image.isDefault === true)[0].path,
            cuttingMethod: data.cuttingMethod

        })
    }
    
    return <Col sm={24} md={7} lg={5} className='addonCard'>
        {isOpenModal &&
            <AddonModal packageType={packageType} getAddonData={(data) => getAddonData(data)} product={details}
                        isOpen={isOpenModal}
                        toggleModal={setOpenAddon}/>
        }
        <Card style={{borderBottom: `#${details?.product?.category.color} 5px solid`}}
              className='w-100 card-view'>
            {details.discount > 0 && <div className="discount-badge-wrapper" style={{
                top: -6,
                left: -6
            }}>

                <h3 className={'discount-badge'}>{details.discount}% <span
                    style={{fontSize: 8, fontWeight: "normal"}}>OFF</span></h3>

                <Image
                    alt="d"
                    src={discountStar}
                    width={80}
                    height={60}
                    className="discount_star_img"
                />
            </div>}
            <div className="img-wrapper">
                <Image src={details.files?.filter(image => image.isDefault === true)[0]?.path} width='200'
                       height={'200'}
                       alt={'dss'}/>
            </div>

            <Row>
                <Col md={24} lg={24}>
                    <div className="d-flex flex-column">
                        <small className='category-name'>{details.category}</small>
                        <span className="prod-name">
                         {details.name}
                      </span>

                    </div>

                    <div className="d-flex flex-column">
                        <small className='category-name'>Starting from</small>
                        <span className="price">
                         {formatPrice(details?.sellingPrice)} <DoubleRightOutlined className='arrow-icon'/>
                      </span>

                    </div>
                    <Button onClick={() => setOpenAddon()} className='w-100 addon-btn'>Add</Button>
                </Col>
            </Row>
        </Card></Col>
}
export default AddonCard