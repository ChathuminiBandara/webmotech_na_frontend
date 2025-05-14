import CommonLayout from "@/app/layouts/commonLayout";
import {Col, Descriptions, Divider, Modal, Row} from "antd";
import {ModalBody} from "reactstrap";
import {useEffect, useState} from "react";
import moment from "moment";
import {formatPrice} from "@/util/CommonFun";
import Image from 'next/image'

const OrderDetails = ({orderDetails, open, onOk, onCancel}) => {
    const [order, setOrder] = useState([]);


    useEffect(() => {
        console.log(orderDetails)

        setData()
    }, []);

    const setData = () => {
        let temp = [
            {
                key: '1',
                label: 'Order Id',
                children: orderDetails.orderId,
            }, {
                key: '2',
                label: 'Order Date',
                children: moment(orderDetails.createdAt).format('YYYY-MM-DD'),
            }, {
                key: '3',
                label: 'Order Description',
                children: orderDetails.description,
            }, {
                key: '4',
                label: 'Payment Type',
                children: orderDetails.paymentMethod.type,
            }, {
                key: '5',
                label: 'Amount',
                children: <b>{formatPrice(orderDetails.payment.amount)}</b>,
            },
        ]
        setOrder(temp)
    }

    return <Modal width={'75rem'} footer={null}
                  maskClosable={false}
                  title="Order Details" open={open} onOk={onOk} onCancel={onCancel}>
        <ModalBody>
            <Row>
                <Col sm={24} md={24} lg={24}>
                    <Descriptions title="Order Details" items={order}/>
                </Col>
                <Divider/>
                <Col sm={24} md={24} lg={24}>
                    {orderDetails.packs.map((item, index) => <Row>
                        <Image alt='sds' width={200} height={200} src={item.productPackage.files[0].file.path}/>
                    </Row>)}
                </Col>
            </Row>
        </ModalBody></Modal>
}

export default OrderDetails