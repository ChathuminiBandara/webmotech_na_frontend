"use client"
import CommonLayout from "../../app/layouts/commonLayout";
import '../../styles/cartView.scss'
import {Breadcrumb, Button, Col, Row} from "antd";
import React, {useEffect, useState} from "react";
import {CART_LIST} from "@/util/constants";
import {useDispatch} from "react-redux";
import {setLoading} from "@/redux/actions/loadingActions";
import {Card, CardBody} from "reactstrap";
import {formatPrice} from "@/util/CommonFun";
import {Archive, ArrowRight} from "react-feather";
import CartRow from "../../components/dataRow/CartRow";
import {useRouter} from 'next/navigation'
import {setTotal as totRedux, setDiscountedAmount} from "../../redux/actions/calculationAction";
import * as constant from '../../util/constants'
import {setCartFunction} from "@/redux/actions/cartActions";

const Page = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const [cartList, setCartList] = useState([])
    const [total, setTotal] = useState(0)
    const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(0)

    useEffect(() => {
        dispatch(setLoading(false));
        loadCartDetailsIntoView()
    }, []);

    useEffect(() => {
        dispatch(setLoading(false));
        loadCartDetailsIntoView()
    }, [setCartList]);

    const loadCartDetailsIntoView = async () => {
        dispatch(setLoading(true));
        let temp = []
        let temp_total = 0
        let temp_total_without_discount = 0
        let data = JSON.parse(localStorage.getItem(CART_LIST));
        let totalValue = 0
        data?.map((cartItem) => {
            console.log(cartItem)
            cartItem?.addonDetails?.map((addon, index) => {

                totalValue += addon?.addonPrice * addon?.qty
                console.log(addon?.addonPrice * addon?.qty)
            })
            console.log(cartItem?.discounted_Price * cartItem?.qty)
            totalValue += cartItem?.discounted_Price * cartItem?.qty

            temp.push({
                "prodName": cartItem.prodName,
                "prodId": cartItem.prodId,
                "addons": cartItem.addonDetails,
                "image": cartItem.image,
                "qty": cartItem.qty,
                "cartId": cartItem.cartId,
                "price": cartItem.price + totalValue,
                "discount_percentage": cartItem.discount_percentage,
                "discounted_Price": cartItem.discounted_Price,
                "data": cartItem.data
            })

            temp_total_without_discount += (cartItem.price * cartItem.qty)
        })

        await setTotal(totalValue)
        await setTotalWithoutDiscount(temp_total_without_discount)

        dispatch(setDiscountedAmount(temp_total_without_discount));

        dispatch(setCartFunction());
        await setCartList(temp)
        dispatch(setLoading(false));
        console.log(temp)
    }


    const deleteCartItem = (data) => {
        let temp = cartList.filter(item => item.cartId !== data.cartId)
        console.log(data)
        setCartList(temp)
        let removeAmountTemp = 0
        data?.addon?.map((addData, index) => {
            removeAmountTemp += addData.addonPrice
        })

        removeAmountTemp += data.discounted_Price;

        setTotal(total - removeAmountTemp)
        dispatch(setCartFunction());
        localStorage.setItem(constant.CART_LIST, JSON.stringify(temp));
        dispatch(setCartFunction());
        loadCartDetailsIntoView()
    };

    const removeItemFromCart = (id) => {
        console.log(id, cartList);
        let data = cartList.filter(item => item.prodId === id)
    }

    console.log(total)
    return <CommonLayout>
        <div className="cartView">
            <div className="cart-container">
                <div className="container">
                    <Row>
                        <Col md={24} lg={24} xl={24}>
                            <Breadcrumb
                                items={[{
                                    title: 'Home',
                                }, {
                                    title: 'Cart',
                                }

                                ]}
                            />
                        </Col>
                    </Row>


                    <Col className='mt-3'><h3>Your Cart</h3></Col>
                    <Row>
                        <Col md={14} lg={14} xl={14}>

                            <Col md={24} lg={24} xl={24}>
                                {cartList.length > 0 ? <Card className='mt-3 cart-view-card'>
                                        <CardBody>
                                            {cartList.map((item) =>
                                                <CartRow
                                                    removeItem={(item) => removeItemFromCart(item)}
                                                    deleteCartItem={(item) => deleteCartItem(item)}
                                                    item={item}/>)
                                            }
                                        </CardBody>
                                    </Card> :
                                    <Card className='mt-3 p-3 text-center cart-view-card'>
                                        <CardBody>
                                            <Archive color={'rgba(178,178,178,0.47)'} size={36}/>
                                            <p>Your cart is empty!</p>
                                        </CardBody></Card>}
                            </Col>
                        </Col>
                        <Col md={10} lg={10} xl={10}>
                            <Card className={'mt-3 summary-wrapper'}>
                                <Row className='tbl-row-wrapper'>
                                    <Col md={18} lg={18} xl={18}><span className="tbl-topic">Total Items</span></Col>
                                    <Col className='text-end tbl-value' md={6} lg={6} xl={6}> <b>{cartList.length}</b>
                                    </Col>
                                </Row>


                            </Card>

                            <Card className='tbl-total-wrapper'>
                                <Row>
                                    <Col md={18} lg={18} xl={18}><span className="tbl-topic">Total</span></Col>
                                    <Col className='text-end tbl-value' md={6} lg={6} xl={6}>{formatPrice(total)}</Col>
                                </Row>
                            </Card>
                            <Row>
                                <Button disabled={cartList.length === 0} onClick={() => {
                                    router.push('/checkout')
                                    dispatch(setLoading(true));
                                }} className={'proceed-btn'}>
                                    Proceed to Checkout <ArrowRight className='mx-2' size={16}/>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    </CommonLayout>
}

export default Page