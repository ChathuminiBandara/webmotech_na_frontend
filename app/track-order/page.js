"use client"
import CommonLayout from "@/app/layouts/commonLayout";
import '../../styles/trackOrder.scss'
import {Button, Space, Col, Input, Row, ConfigProvider} from "antd";
import {Container} from "reactstrap";
import {Card, CardBody} from "reactstrap";
import Image from "next/image";
import pendingImage from '../../public/assets/pending-order.gif'
import Compact from "antd/es/space/Compact";
import {useEffect, useState} from "react";
import Lottie from 'react-lottie';
import pending from '../../public/assets/lottie/Pending 2.json';
import Processing from '../../public/assets/lottie/Processing 2.json';
import Delivered from '../../public/assets/lottie/Lorry.json';
import HandOn from '../../public/assets/lottie/dd.json';
import * as trackingService from "@/service/orderTrackingService";
import {customToastMsg} from "@/util/CommonFun";
import {setLoading} from "@/redux/actions/loadingActions";
import {useDispatch} from "react-redux";

const Page = () => {

    const dispatch = useDispatch()
    const [trackingNumber, setTrackingNumber] = useState('')
    const [orderTrackingDetails, setOrderTrackingDetails] = useState([])

    useEffect(() => {
    }, []);


    const trackOrderStatus = () => {
        dispatch(setLoading(true));
        trackingService.trackOrderDetailsByOrderId(trackingNumber).then(res => {
            setOrderTrackingDetails(res.data)
            dispatch(setLoading(false));
        }).catch(c => {
            console.log(c.message.message)
            dispatch(setLoading(false));
            customToastMsg(c.message.message, 0)
        })
    }
    console.log(orderTrackingDetails)
    return <CommonLayout>
        <div className="trackOrder">
            <Row className={`w-100 ${orderTrackingDetails.length === 0 && 'bg-name-track'}`}>

                <Col md={24}>
                    <h1 className="d-flex justify-content-center">

                        <div className='w-100 mt-2 d-flex justify-content-center align-items-center flex-column'>
                            <h2>Track Your Order</h2>
                            <Container className='w-100 '>
                                <Row className='d-flex justify-content-center'>
                                    <Col className='d-flex justify-content-center flex-column' sm={24} md={10}>

                                        <p className='text-center mt-1 tracking-para'>Use your order reference number as
                                            the tracing number. </p>
                                        < Compact
                                            className='mt-1 mb-3 w-100'
                                        >
                                            <ConfigProvider
                                                theme={{
                                                    token: {
                                                        colorPrimary: '#039343FF',
                                                     },
                                                }}
                                            >
                                                <Input onChange={(e) => {
                                                    setTrackingNumber(e.target.value)
                                                }} size="large" placeholder="Your tracking number"/>
                                            </ConfigProvider>
                                            <Button disabled={trackingNumber === ''} onClick={() => {
                                                trackOrderStatus()
                                            }} size="large" className='tracking-btn' type="primary">Track Your
                                                Order</Button>

                                        </ Compact>

                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </h1>
                </Col>
            </Row>

            {orderTrackingDetails.length !== 0 && <Container>
                <Row className='d-flex justify-content-center'>
                    <Col sm={24} md={18} lg={16}>
                        <Card>
                            <CardBody className=' my-2 content-wrapper'>

                                <Lottie
                                    options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: orderTrackingDetails.orderStatus === 'Processing' ? Processing :
                                            orderTrackingDetails.orderStatus === 'Shipping' ? Delivered :
                                                orderTrackingDetails.orderStatus === 'Pending' ? pending : HandOn
                                    }}
                                    height={200}
                                    width={200}
                                />
                                <h4>Your Order is {orderTrackingDetails.orderStatus}</h4>
                                {orderTrackingDetails.orderStatus === 'Processing' ?
                                    <p className='text-center px-5 status-para'>
                                        Your order number is {orderTrackingDetails.orderId}. Your order is currently
                                        pending. This means that we've received your order, and it's awaiting
                                        processing. Our team is preparing to fulfill your order as soon as possible.
                                        Thank you for your patience. Rest assured, we'll keep you updated on the
                                        progress. Thank you for choosing our services!
                                    </p> : orderTrackingDetails.orderStatus === 'Pending' ?
                                        <p className='text-center px-5 status-para'>
                                            Your order number is {orderTrackingDetails.orderId}. Your order is currently
                                            being processed. This means that we've received your order and it's now
                                            being prepared for delivery. We're excited to inform you that your package
                                            is undergoing the necessary checks and preparations to ensure it reaches you
                                            in perfect condition. Our team is working diligently to expedite this
                                            process, and we appreciate your patience. Rest assured, we'll keep you
                                            updated every step of the way. Thank you for choosing our services!
                                        </p> : orderTrackingDetails.orderStatus === 'Delivering' ?
                                            <p>Your order number is {orderTrackingDetails.orderId}. Your order is now
                                                out for delivery. Our delivery team is on their way to bring your
                                                package to you. Please ensure someone is available at the delivery
                                                address to receive the order. If you have any special instructions or
                                                preferences, please let us know. Thank you for choosing our services!
                                            </p> : orderTrackingDetails.orderStatus === 'Delivered' ?
                                                <p>Your order number is {orderTrackingDetails.orderId}. We're happy to
                                                    inform you that your order has been successfully delivered. We hope
                                                    you're satisfied with your purchase. If you have any questions or
                                                    concerns, please don't hesitate to contact us. Thank you for
                                                    choosing our services, and we look forward to serving you again in
                                                    the future!
                                                </p> : <p>We regret to inform you that your order
                                                    number {orderTrackingDetails.orderId} has been cancelled. If you
                                                    have any questions regarding this cancellation or would like further
                                                    assistance, please don't hesitate to reach out to our customer
                                                    support team. We apologize for any inconvenience caused and
                                                    appreciate your understanding. Thank you for considering our
                                                    services.
                                                </p>
                                }

                                <Row className='mt-4 w-100 d-flex justify-content-center text-center'>

                                    <Col md={7} className='bg-details'>
                                        <h6>Customer name</h6>
                                        <p>
                                            <b>
                                                {`${orderTrackingDetails?.customer?.firstName} 
                                            ${orderTrackingDetails?.customer?.lastName}`}
                                            </b>
                                        </p>
                                    </Col>

                                    <Col md={7} className='bg-details'>
                                        <h6>Address</h6>
                                        <p><b>{orderTrackingDetails?.shippingAddress?.address}</b></p>
                                    </Col>
                                    <Col md={7} className='bg-details'>
                                        <h6>Contact number</h6>
                                        <p><b>{orderTrackingDetails?.customer?.contactNo}</b></p>
                                    </Col>

                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>}
        </div>
    </CommonLayout>
}

export default Page