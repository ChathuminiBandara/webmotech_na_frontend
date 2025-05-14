import {Button, Col, Divider, Modal, Popconfirm, Row, Badge} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {CART_LIST} from "@/util/constants";
import {setCartFunction} from "@/redux/actions/cartActions";
import {useDispatch} from "react-redux";
import {customToastMsg, formatPrice} from "@/util/CommonFun";
import Image from 'next/image'
import '../../styles/confirmCart.scss'
import {CloseCircleOutlined, QuestionCircleOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {setLoading} from "@/redux/actions/loadingActions";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import Lottie from "react-lottie";
import testImage from "@/public/assets/lottie/cartLoader.json";

gsap.registerPlugin(MotionPathPlugin);

const AddToCartConfirm = ({isOpen, toggleModal, data, removeAddon}) => {
    const cartButtonRef = useRef(null);
    const cartIconRef = useRef(null);
    const animationRef = useRef(null);
    const dispatch = useDispatch();

    let details = localStorage.getItem(CART_LIST) ? JSON.parse(localStorage.getItem(CART_LIST)) : [];

    const [orderData, setOderData] = useState([])
    const [orderTotal, setOrderTotal] = useState(0)


    const addToCart = () => {
        if (cartButtonRef.current && animationRef.current && cartIconRef.current) {
            const cartButton = cartButtonRef.current;
            const cartIcon = cartIconRef.current;
            const animatedElement = animationRef.current;

            const rectButton = cartButton.getBoundingClientRect();
            const rectIcon = cartIcon.getBoundingClientRect();
            console.log(animatedElement)
            gsap.fromTo(animatedElement,
                {
                    x: 0,
                    y: -50,
                    display: 'block', opacity: 1,
                },
                {
                    duration: 3,
                    motionPath: {
                        path: [
                            {x: rectButton.left, y: rectButton.top - (window.innerWidth / 3)},
                            {x: window.innerHeight, y: -window.innerWidth},
                        ],
                        curviness: 1.5,
                        autoRotate: true,
                        start: 0,
                        end: 1,
                    }, opacity: 0,
                    ease: "sine.inOut",
                    onComplete: () => {
                        if (animatedElement) {
                            console.log('isComplete', rectButton.left)
                            animatedElement.style.display = 'none';
                        }
                    }
                });
        }
        setTimeout(() => {
            dispatch(setLoading(true));
            details.push({...orderData, cartId: Math.random()});
            localStorage.setItem(CART_LIST, JSON.stringify(details));
            dispatch(setCartFunction());
            toggleModal();
            customToastMsg('Your selected package move to cart successfully', 1)
            dispatch(setLoading(false));
        }, 1500)

    }

    useEffect(() => {
        getLoadData()
    }, []);

    useEffect(() => {

    }, [orderData]);
    const getLoadData = () => {
        dispatch(setLoading(true));

        let totalValue = 0
        data?.addonDetails.map((addon, index) => {
            totalValue += addon?.addonPrice * addon.qty
        })
        totalValue += data?.discounted_Price * data?.qty
        console.log(totalValue)
        setOrderTotal(totalValue)
        setOderData(data)
        dispatch(setLoading(false));
    }


    const removeAddonDetails = (data) => {

        let temp = orderTotal
        console.log(orderData)
        console.log(data)


        setOrderTotal(temp - (data.addonPrice * data.qty))

        let updatedOrderData = {
            ...orderData,
            addonDetails: orderData.addonDetails.filter(addon => addon.id !== data.id)
        }
        console.log(updatedOrderData)

        removeAddon(data)
        setOderData(updatedOrderData)

    }
    console.log(data, orderData)
    return orderData.length !== 0 && <Modal
        className='confirmCartModal'
        style={{top: 20,}}
        title={<h1>Confirm Add to cart</h1>}
        open={isOpen && orderData.length !== 0}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={null}
        maskClosable={false}
        width={650}
    >

        <Row>
            <Col className='modal-topic-label' sm={24} md={24} lg={24} xl={24}>
                Package Details
            </Col>
        </Row>
        <Row className='w-100 d-flex align-items-center'>

            <Col sm={8} md={8} lg={8} xl={8}>
                <Image className='package-img' src={orderData?.image} alt='prodImage' height={80} width={80}/>
            </Col>

            <Col xs={16} sm={16} md={8} lg={8} xl={8} className='d-flex flex-column'>
                <span className='prod-name-confirm'> {orderData?.prodName}</span>

                <span
                    className='prod-qty-unit-price'> {formatPrice(orderData?.discounted_Price)} X {orderData?.qty}</span>
            </Col>

            <Col className=' text-end amount-label' xs={24} sm={24} md={8} lg={8} xl={8}>

                <span> {formatPrice(orderData?.discounted_Price * orderData?.qty)}</span>
            </Col>

        </Row>

        {orderData?.addonDetails?.length !== 0 && <Divider/>}
        <Row className='position-relative'>

            {orderData?.addonDetails?.length > 0 &&
                <Col className='modal-topic-label' sm={24} md={24} lg={24} xl={24}>
                    Selected Add-ons
                </Col>}
            {orderData?.addonDetails.map((addon, index) => <Row className='w-100 my-2 d-flex align-items-center'>

                <Col sm={8} md={8} lg={8} xl={8}>
                    {addon.cuttingMethod.length > 0 ?
                        <Badge.Ribbon placement="start" color='#039343' text={addon.cuttingMethod.name}>
                            <Image className='package-img' src={addon.image} alt='prodImage' height={80} width={80}/>
                        </Badge.Ribbon> :
                        <Image className='package-img' src={addon.image} alt='prodImage' height={80} width={80}/>
                    }
                </Col>

                <Col xs={16} sm={16} md={8} lg={8} xl={8} className='d-flex flex-column'>
                    <span className='prod-name-confirm'> {addon.name}</span>

                    <span
                        className='prod-qty-unit-price'> {addon?.selectedAddon[0].label}({addon?.selectedAddon[0].value})   X {addon.qty}</span>
                </Col>

                <Col className=' text-end amount-label' xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Popconfirm
                        title="Remove this from package"
                        description="Are you sure to romeve this add-on from this package?"
                        onConfirm={(e) => removeAddonDetails(addon)}
                        okText='Delete'
                        okType='danger'
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: 'red',
                                }}
                            />
                        }
                    > <CloseCircleOutlined
                        size={12}
                        className='close-btn'/>
                    </Popconfirm>
                    <span> {formatPrice(addon?.addonPrice * addon.qty)}</span>
                </Col>

            </Row>)}

        </Row>

        <Divider/>

        <Row className={'total-label'}>

            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                <span className='amount-label'>Order Total </span>
            </Col>

            <Col className='text-end amount-label' xs={8} sm={8} md={8} lg={8} xl={8}>
                {formatPrice(orderTotal)}
            </Col>

        </Row>


        <div style={{position: 'absolute', top: 0, left: 0}} ref={cartIconRef}></div>
        <Row>
            <Col className='mt-4' xs={24} sm={24} md={24} lg={24} xl={24}>
                <Button onClick={addToCart} ref={cartButtonRef} className='btn-continue-order w-100'>
               <span className="w-100 h-100 d-flex justify-content-center align-items-center"><ShoppingCartOutlined
                   style={{fontSize: '20px', marginRight: '10px'}}/> Continue Order
                    <div style={{position: 'absolute', top: 0, display: 'none'}} ref={animationRef}>
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: testImage
                        }}
                        height={200}
                        width={200}
                    />
                    </div> </span>
                </Button>
            </Col>
        </Row>
    </Modal>
}

export default AddToCartConfirm