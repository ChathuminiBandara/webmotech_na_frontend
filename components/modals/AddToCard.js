"use client"

import {Input, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import Image from "next/image";
import {Form, Button, InputNumber} from 'antd'
import '../../styles/AddToCard.scss'
import {formatPrice} from "../../util/CommonFun";
import {ShoppingCart} from "react-feather";
import {CART_LIST} from "../../util/constants";
import {useDispatch} from "react-redux";
import {setCartFunction} from "../../redux/actions/cartActions";
import discountStar from "@/public/assets/discount_start.png";

const AddToCard = ({isOpen, toggleModal, prodData, direction}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(1);
    useEffect(() => {
     }, []);
    const increaseValue = () => {
        let incrementValue = direction === direction ? 1 : 0.5

        setValue(parseFloat(value) + incrementValue);
    };

    const decreaseValue = () => {
        let decrementValue = direction === direction ? 1 : 0.5
        if (value > 0) {
            setValue(parseFloat(value) - decrementValue);
        }
    };

    const changeQty = async (e) => {
        let qty = e.target.value
        await setValue(qty)
    }

    const AddToCartWithValidation = async () => {
        let details = localStorage.getItem(CART_LIST) ? JSON.parse(localStorage.getItem(CART_LIST)) : [];

        let dataToCart = {
            prodName: prodData.data.name,
            personCount: prodData.data.person_count,
            prodId: prodData.data.id,
            image: prodData.imageUrl,
            qty: value,
            price: prodData.price,
            discount_price: prodData.discountedPrice,
            data: prodData.data
        };


        details.push(dataToCart);

        localStorage.setItem(CART_LIST, JSON.stringify(details));
        dispatch(setCartFunction());
        toggleModal();
    }

    return <Modal
        style={{top: 20,}}
        title={<h1>Add to cart</h1>}
        open={isOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={null}
        maskClosable={false}
        width={650}>
        <div>
            <Row>
                <Col md={3} lg={3} className='d-flex justify-content-end img-wrappaer'>
                    {/*{prodData.isDiscountedPackage &&*/}
                    {/*    <span className={'discount-badge'}>{prodData.data.discount}%</span>}*/}

                    <div className="discount-badge-wrapper" style={{
                        top: -30,
                        left: -30
                    }}>
                        {prodData.isDiscountedPackage &&
                            <h3 className={'discount-badge'}>{prodData.data.discount}% <span
                                style={{fontSize: 8, fontWeight: "normal"}}>OFF</span></h3>
                        }
                        <Image
                            alt="d"
                            src={discountStar}
                            width={90}
                            height={70}
                            className="discount_star_img"
                        />
                    </div>
                    <Image
                        alt="d"
                        src={prodData.imageUrl}
                        width={200}
                        height={200}
                        className="family_pack_img"
                    />
                </Col>
                <Col md={5} lg={5} className={'packageDetails'}>
                    <h4 className='prod-name'>{prodData.data.name}</h4>
                    <span>({prodData.data.person_count} Person Pack)</span>
                    <br/>
                    <small className='text-danger text-decoration-line-through'>{formatPrice(prodData.price)}</small>
                    <h5>{formatPrice(prodData.discountedPrice)}</h5>
                </Col>
                <Col md={4} lg={4} className='qty-section'>
                    <div className="number-input-qty">
                        <div className="d-flex flex-row qty-wrapper">
                            <Button className="valueButton dec-btn" onClick={decreaseValue}>-</Button>
                            <Input onChange={async (e) => {
                                changeQty(e)
                            }}
                                   className="numberInput"
                                   value={value}/>
                            <Button className="valueButton inc-btn" onClick={increaseValue}>+</Button>
                        </div>
                    </div>
                    <h5 className='mt-2'>{formatPrice(prodData.discountedPrice * value)}</h5>

                </Col>
            </Row>

            <Row className='d-flex justify-content-end mt-5'>
                <Col sm={12} md={12} lg={12}>
                    <Button disabled={parseFloat(value) === 0} onClick={() => {
                        AddToCartWithValidation()
                    }} type="button" className="btn-addToCart w-100">
                        <ShoppingCart size={16} style={{margin: "0 10px 0 0"}}/> Add to cart
                    </Button> </Col>
            </Row>
        </div>
    </Modal>
}

export default AddToCard