"use client"
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row} from 'antd';
import '../../../styles/orderSuccess.scss'
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../redux/actions/loadingActions";
import {setCartFunction} from "../../../redux/actions/cartActions";
import harvest from '../../../public/assets/harvest.png'
import hero from '../../../public/assets/HeroSecBg.png'
import Image from "next/image";
import CommonLayout from "../../layouts/commonLayout";
import {orderDetailsGetById, orderPaymentMethodUpdateIntoCOD, orderResponseGetById} from "@/service/orderService";
import {handleError} from "@/util/CommonFun";
import * as constant from "@/util/constants";
import {VscError} from "react-icons/vsc";
import OrderFailureModal from "@/components/modals/ChangePaymentOption";
import {URL_REMOTE} from "@/service/apiConfig";

const Page = ({params}) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [orderDetails, setOrderDetails] = useState([])
    const [paymentResponse, setPaymentResponse] = useState([])
    const [isPaymentOptionSelector, setIsPaymentOptionSelector] = useState(false)

    useEffect(() => {
        localStorage.removeItem(constant.CART_LIST);
        getOrderDetails()
    }, []);

    const retryPayment = () => {
        document.getElementById("pg_instance_id").value = paymentResponse.pgInstanceId;
        document.getElementById("merchant_id").value = paymentResponse.merchantId;
        document.getElementById("perform").value = paymentResponse.perform;
        document.getElementById("currency_code").value = paymentResponse.currencyCode;
        document.getElementById("amount").value = orderDetails.total * 100;
        document.getElementById("merchant_reference_no").value = paymentResponse.merchantReferenceNo;
        document.getElementById("order_desc").value = "test";
        document.getElementById("message_hash").value = paymentResponse.messageHash;
        document.getElementById("merchant_response_url").value = `${URL_REMOTE}/api/seylan/wibmo/webhook`;

        document.merchantForm.action = `https://${paymentResponse?.pgDomain}/AccosaPG/verify.jsp`;
        document.merchantForm.submit();
    }


    const getOrderDetails = () => {
        dispatch(setLoading(true));
        let ordId = params.id
        orderResponseGetById(ordId).then(res => {
            if (res.data?.paymentResponse) {
                setOrderDetails(res.data.order)
                setPaymentResponse(res.data?.paymentResponse)
            } else {
                localStorage.removeItem(constant.CART_LIST);
                dispatch(setCartFunction());
                setOrderDetails(res.data)
            }


        }).catch(c => {
            handleError(c)
        }).finally(f => {
            dispatch(setLoading(false));
        })
    }

    return orderDetails.orderId && <CommonLayout>
        {/*<div className="message">*/}
        {/*    <h2>Transaction is being processed,<br/>Please wait...</h2>*/}
        {/*</div>*/}
        <form name="merchantForm" method="post">
            <input type="hidden" name="pg_instance_id" id="pg_instance_id"/>
            <input type="hidden" name="merchant_id" id="merchant_id"/>
            <input type="hidden" name="perform" id="perform"/>
            <input type="hidden" name="currency_code" id="currency_code"/>
            <input type="hidden" name="amount" id="amount"/>
            <input
                type="hidden"
                name="merchant_reference_no"
                id="merchant_reference_no"
            />
            <input type="hidden" name="order_desc" id="order_desc"/>
            <input type="hidden" name="message_hash" id="message_hash"/>
            <input type="hidden" name="merchant_response_url" id="merchant_response_url"/>
            <noscript>
                <div className="message">
                    <h2>
                        JavaScript is currently disabled or is not supported by your
                        browser.<br/>
                        Please click Submit to continue the processing of your
                        transaction.<br/><br/>
                        <input type="submit"/>
                    </h2>
                </div>
            </noscript>
        </form>

        <OrderFailureModal currentPaymentMethod={orderDetails?.paymentMethod?.id} openModal={isPaymentOptionSelector}
                           toggle={() => {
                               setIsPaymentOptionSelector(false)
                           }} handleOk={(data) => {
            if (data[0].code === 'CP') {
                retryPayment();
                setIsPaymentOptionSelector(false)
            } else {
                let updatePaymentMethod = {
                    orderId: orderDetails.id,
                    paymentMethod: data[0]?.id
                }
                orderPaymentMethodUpdateIntoCOD(updatePaymentMethod).then(res => {
                  location.href = `/order-status/${res.data.id}`
                })
                setIsPaymentOptionSelector(false)
             }

        }}/>

        {orderDetails?.payment.length >= 0 && <div>
            {orderDetails?.payment[0]?.status === 'FAIL' ? <div
                className={`orderfailed`}>
                <Image className='bg-hero-img' src={hero}
                       width={100}
                       height={100}
                       alt='3'/>
                <div className="bg-red"></div>
                <Card className='orderSuccess-card'>

                    <VscError size={48} color='danger' style={{color: '#ab2c2c'}}/>
                    <h2 className='main-header-topic'>Oh no, <span
                        className='header-topic'>your order is failed</span>
                    </h2>

                    <h6 className='mb-3'>We're sorry, but there was an issue processing your order.</h6>
                    {/*<b>*/}
                    {/*    Order number: <b>{orderDetails?.orderId}</b> <br/></b>*/}

                    <span
                        className='mt-3'>Please try again or contact our support team if the issue persists.</span>
                    <Row className='w-100 mt-3 d-flex justify-content-center'>
                        <Col classNames='w-100 ' sm={24} md={12} lg={12}>
                            <Button classNames='w-100' onClick={() => {
                                dispatch(setLoading(true));
                                router.push('/package-store/raw');
                                localStorage.removeItem('orderNumber');
                                dispatch(setCartFunction());
                            }} className='confirm-btn'>
                                Back to Store
                            </Button>
                        </Col>
                        <Col classNames='w-100 ' sm={24} md={12} lg={12}>
                            <Button outline onClick={() => {

                                setIsPaymentOptionSelector(true)
                                //retryPayment();
                            }} className='retry-btn outline'>
                                Retry to do your payment
                            </Button>
                        </Col>
                    </Row>

                </Card>
            </div> : <div
                className={`orderSuccess`}>
                <Image className='bg-hero-img' src={hero}
                       width={100}
                       height={100}
                       alt='3'/>

                <div className="bg-green"></div>
                <Card className='orderSuccess-card'>

                    <Image src={harvest}
                           width={70}
                           height={70}
                           alt='3'/>
                    <h2 className='main-header-topic'>Thank you <span className='header-topic'>For Purchasing</span>
                    </h2>

                    <h6 className='mb-3'>Successfully ordered your Packages!</h6>
                    <b>
                        Order number: <b>{orderDetails?.orderId}</b> <br/></b>

                    <span className='mt-3'>Our delivery team will be processing your order shortly. <br/> You can pay for your order and receive it directly at your doorstep.  </span>
                    <Row className='w-100 mt-3 d-flex justify-content-center'>
                        <Col classNames='w-100 ' sm={24} md={12} lg={12}>
                            <Button classNames='w-100' onClick={() => {
                                dispatch(setLoading(true));
                                router.push('/package-store/raw');
                                localStorage.removeItem('orderNumber');
                                dispatch(setCartFunction());
                            }} className='confirm-btn'>
                                Back to Store
                            </Button>
                        </Col>
                    </Row>

                </Card>
            </div>}
        </div>}

    </CommonLayout>
};
export default Page;