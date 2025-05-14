import {Button, Card, Col, Divider, Badge, Popconfirm, Row} from "antd";
import {Trash2} from "react-feather";
import Image from "next/image";
import {formatPrice} from "../../util/CommonFun";
import React, {useEffect, useState} from "react";
import '../../styles/cartView.scss'
import '../../styles/CartRow.scss'
import {useDispatch} from "react-redux";
import {CloseCircleOutlined, QuestionCircleOutlined} from "@ant-design/icons";

const CartRow = ({item, calculateTotal, deleteCartItem}) => {

    const dispatch = useDispatch()

    const [value, setValue] = useState(item.qty);
    const [orderTotal, setOrderTotal] = useState(0);


    useEffect(() => {
        console.log(item)
        getCalculation()
    }, [item]);

    const getCalculation = () => {
        console.log(item)
        let totalValue = 0
        item.addons !== undefined &&
        item?.addons?.map((addon, index) => {
            totalValue += addon?.addonPrice * addon.qty
        })
        totalValue += item?.discounted_Price * item?.qty


        console.log(totalValue)
        setOrderTotal(totalValue)
    }


    useEffect(() => {
        console.log(item)
        setValue(item.qty)
    }, []);

    const removePackageFromCart = async (data) => {
        deleteCartItem(data)
    }

    return <Card className='  cartRow my-4'>
        <Row className='w-100 d-flex align-items-center'>
            <Col className='d-flex justify-content-between' sm={24} md={24} lg={24} xl={24}>
                <span className='modal-topic-label'>Package Details</span>
                <Popconfirm
                    title="Remove this package from cart"
                    description="Are you sure to romeve this package from cart?"
                    onConfirm={(e) => {

                        removePackageFromCart(item)
                    }}
                    okText='Remove'
                    okType='danger'
                    icon={
                        <QuestionCircleOutlined
                            style={{
                                color: 'red',
                            }}
                        />
                    }
                > <Trash2 style={{cursor: 'pointer'}} color='#dc3545' size={14}/> </Popconfirm>
            </Col>
            <Col sm={8} md={8} lg={8} xl={8}>
                <Image className='package-img' src={item?.image} alt='prodImage' height={80} width={80}/>
            </Col>

            <Col xs={16} sm={16} md={8} lg={8} xl={8} className='d-flex flex-column'>
                <span className='prod-name-confirm'> {item?.prodName}</span>

                <span
                    className='prod-qty-unit-price'> {formatPrice(item?.discounted_Price)} X {item?.qty}</span>

            </Col>

            <Col className=' text-end amount-label' xs={24} sm={24} md={8} lg={8} xl={8}>

                <span> {formatPrice(orderTotal)}</span>
            </Col>

        </Row>

        {item?.addons !== 0 && <Divider className='my-2'/>}

        {/*Add-ons*/}
        <Row className='  w-100'>

            {item?.addons?.length > 0 &&
                <Col className='modal-topic-label' sm={24} md={24} lg={24} xl={24}>
                    Selected Add-ons
                </Col>}
            <Row className='w-100   align-items-center'>
                {item?.addons?.map((addon, index) => <Col sm={8} md={7} lg={5} xl={5} className='mx-2'>
                        {addon.cuttingMethod.length > 0 ?
                            <Badge.Ribbon placement='start' text={addon?.cuttingMethod?.name} color="#039343"> <Card
                                className='add-on-card'>
                                <Image className='card-package-img' src={addon.image} alt='prodImage' height={80}
                                       width={80}/>
                                <p className='card-name-label text-center'> {addon.name}</p>
                                <p
                                    className='card-prod-qty-unit-price '> {addon?.selectedAddon[0].label}({addon?.selectedAddon[0].value})
                                    X {addon.qty}</p>

                                <p className='card-total-label'> {formatPrice(addon.addonPrice * addon.qty)}</p>
                            </Card></Badge.Ribbon> : <Card
                                className='add-on-card'>
                                <Image className='card-package-img' src={addon.image} alt='prodImage' height={80}
                                       width={80}/>
                                <p className='card-name-label text-center'> {addon.name}</p>
                                <p
                                    className='card-prod-qty-unit-price '> {addon?.selectedAddon[0].label}({addon?.selectedAddon[0].value})
                                    X {addon.qty}</p>

                                <p className='card-total-label'> {formatPrice(addon.addonPrice * addon.qty)}</p>
                            </Card>}


                    </Col>
                )}</Row>

        </Row>


    </Card>
}
export default CartRow