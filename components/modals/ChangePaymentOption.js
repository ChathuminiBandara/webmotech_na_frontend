import React, {useEffect, useState} from 'react';
import {Modal, Button, Radio, Row, Col, ConfigProvider, Avatar} from 'antd';
import {useDispatch} from "react-redux";
import {setLoading} from "@/redux/actions/loadingActions";
import * as orderService from "@/service/orderService";
import {customToastMsg} from "@/util/CommonFun";
import {CreditCardOutlined, DollarOutlined} from "@ant-design/icons";
import "../../styles/AddonCard.scss"

const OrderFailureModal = ({currentPaymentMethod, openModal, handleOk, toggle}) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const dispatch = useDispatch()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);

    useEffect(() => {
        setSelectedPaymentMethod(currentPaymentMethod)
    }, [openModal]);

    useEffect(() => {
        setSelectedPaymentMethod(currentPaymentMethod)
        console.log(currentPaymentMethod)
        loadPaymentAndDeliveryMethods()
    }, []);

    const onChange = e => {
        setSelectedOption(e.target.value);
    };

    const loadPaymentAndDeliveryMethods = () => {
        dispatch(setLoading(true));
        orderService.getAllPaymentAndDeliveryMethod().then(res => {
            setPaymentMethods(res.data?.paymentMethods)
            dispatch(setLoading(false));
        }).catch(c => {
            dispatch(setLoading(false));
            customToastMsg('Sorry,Try again later', 0)
        })
    }

    return (
        <Modal
            styles={{padding: '20px 40px'}}
            open={openModal}
            title={<h2>Change Order Payment Option</h2>}
            footer={null}
            onCancel={() => {

                toggle()
            }}
            // okText="Chanage and Retry"
            // cancelText="Cancel"
            className={'changePaymentType'}
        >
            <p>You can change your payment option and retry the order payment.</p>
            <Row className='w-100'>
                <Col sm={20} md={20} lg={20} xl={20}>
                    <Radio.Group onChange={onChange} value={selectedPaymentMethod}>
                        {paymentMethods.map((pay, index) => <span style={{
                            width: 'fit-content',
                            padding: 0,
                            marginRight: '12px',
                            marginTop: '10px'
                        }}>
                                                                        <ConfigProvider
                                                                            theme={{
                                                                                token: {
                                                                                    colorPrimary: '#00ad4e',
                                                                                    colorIcon: '#00ad4e'
                                                                                }, components: {
                                                                                    Avatar: {
                                                                                        groupBorderColor: '#00ad4e'
                                                                                    }, defaultBg: '#00ad4e'
                                                                                },
                                                                            }}
                                                                        >
                                                                        <Radio

                                                                            className='w-auto my-1 py-1 text-center h-auto'
                                                                            onClick={(value) => {
                                                                                setSelectedPaymentMethod(value.target.value);
                                                                            }}
                                                                            value={pay.id}>

                                                                            <Avatar className='mx-1'
                                                                                    style={selectedPaymentMethod === pay.id ? {
                                                                                        backgroundColor: '#00ad4e',
                                                                                        color: '#fff',
                                                                                    } : {
                                                                                        backgroundColor: '#dbfcea',
                                                                                        color: '#2f2f2f',
                                                                                    }}
                                                                                    icon={pay.type === 'CASH_ON_DELIVERY' ?
                                                                                        <DollarOutlined size={16}/> :
                                                                                        <CreditCardOutlined
                                                                                            size={16}/>}/>

                                                                            {pay.name} </Radio>
                                                                     </ConfigProvider>
                                                                    </span>)}
                    </Radio.Group>
                </Col>
            </Row>

            <Row className={'w-100 d-flex justify-content-between mt-3'}>
                <Button onClick={() => toggle()}>Cancel</Button>
                <Button className='retry-btn' onClick={(e) => {

                    handleOk(paymentMethods.filter(f => f.id === selectedPaymentMethod))
                }}>Change the payment and retry</Button>
            </Row>

        </Modal>
    );
};

export default OrderFailureModal;
