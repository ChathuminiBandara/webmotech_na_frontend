"use client"
import CommonLayout from "@/app/layouts/commonLayout";
import '../../styles/myOrders.scss'
import {Button, Col, Row, Table} from "antd";
import {Container} from "reactstrap";
import {orderHistoryColumns, USER_PROFILE} from "@/util/constants";
import {useState, useEffect} from "react";
import {setLoading} from "@/redux/actions/loadingActions";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";
import {getAllOrderUsingUser} from "@/service/orderService";
import * as orderService from "@/service/orderService";
import moment from "moment";
import OrderDetails from "@/components/modals/OrderDetails";

const Page = () => {
    const dispatch = useDispatch()
    const [orderDetails, setOrderDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(false);


    useEffect(() => {
        dispatch(setLoading(false));
        getAllOrderDetailsByUserId()
    }, []);

    useEffect(() => {
        console.log(orderDetails)
    }, [orderDetails]);


    const getAllOrderDetailsByUserId = () => {
        dispatch(setLoading(true));
        orderService.getAllOrderUsingUser().then(async res => {
            let temp = [];
            console.log(res.data)
            res.data.records.map((order, index) => {
                console.log(order)
                temp.push({
                    orderId: order.orderId,
                    paymentMethod: order.paymentMethod.type,
                    orderStatus: order.orderStatus,
                    orderItem: order.orderItem,
                    payment: order.payment.amount,
                    more: order,
                    date: moment(order.createdAt).format('YYYY-MM-DD'),
                    action: <Button onClick={(e) => {
                        viewOrderDetails(order)
                    }} className='view-btn'>View</Button>
                })
            })
            console.log(temp)
            await setOrderDetails(temp)
            dispatch(setLoading(false));
        }).catch(c => {
            dispatch(setLoading(false));
        })
    }

    const viewOrderDetails = (order) => {
        setIsModalOpen(true);
        setSelectedOrder(order);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return <CommonLayout>
        {isModalOpen &&
            <OrderDetails orderDetails={selectedOrder} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}/>
        }
        <div className="my-orders">

            <Row className={`w-100  `}>
                <Col md={24}>
                    <div className='w-100 mt-2 d-flex justify-content-center align-items-center flex-column'>
                        <h2>Order History</h2></div>
                </Col></Row>

            <Row className='d-flex justify-content-center w-100'>
                <Col md={18} lg={18} className='mt-3 d-flex justify-content-center'>
                    <Table className='w-100' dataSource={orderDetails} columns={orderHistoryColumns}/>
                </Col>
            </Row>
        </div>
    </CommonLayout>
}

export default Page