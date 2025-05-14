"use client"
import CommonLayout from "../../app/layouts/commonLayout";
import {Avatar, Breadcrumb, Button, Checkbox, Col, ConfigProvider, DatePicker, Radio, Row, Select} from "antd";
import {Card, CardBody, Container, Form, FormGroup, Input, Label} from "reactstrap";
import '../../styles/checkout.scss';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "@/redux/actions/loadingActions";
import Cookies from "js-cookie";
import * as constant from "../../util/constants";
import {useRouter} from "next/navigation";
import {customToastMsg} from "@/util/CommonFun";
import {Package, Truck} from "react-feather";
import * as orderService from "../../service/orderService";
import {getAllTimeSLots} from "@/service/timeSlotService";
import moment from "moment"
import LocationCheck from "@/components/modals/LocationCheck";
import {CreditCardOutlined, DollarOutlined} from "@ant-design/icons";
import {getAllOutletToDropdown} from "@/service/outletService";
import {ACCESS_TOKEN} from "../../util/constants";
import {URL_REMOTE} from "@/service/apiConfig";

const Page = () => {
    const dispatch = useDispatch();
    const router = useRouter()

    const total = useSelector(state => state.totalReducer.total);
    const discountedAmount = useSelector(state => state.totalReducer.discountedAmount);

    console.log(total)
    const [customer, setCustomer] = useState({firstName: "", lastName: "", contactNo: "", email: ""});
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [timeSlotsFullDetails, setTimeSlotsFullDetails] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({
        houseNo: "", streetName1: "", streetName2: "", city: "", cityLabel: "", town: ""
    });

    const [billingAddress, setBillingAddress] = useState({
        houseNo: "", streetName1: "", streetName2: "", city: "", cityLabel: "", town: ""
    });
    const [useSameAddress, setUseSameAddress] = useState(false)
    const [outletId, setOutletId] = useState('')
    const [outletRadius, setOutletRadius] = useState(0)
    const [eligibility, setEligibility] = useState(false)
    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [selectedDeliveryMethod, setSelectedDeliveryMethods] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('ENGLISH');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [mapOPen, setMapOpen] = useState(false);
    const [deliveryLocation, setDeliveryLocation] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [selectedCityLanLat, setSelectedCityLanLat] = useState([]);


    useEffect(() => {
        allTImeSlots();
        loadPaymentAndDeliveryMethods();
        getAllCitiesToShip()
        let cus = Cookies.get(constant.USER_PROFILE) ? JSON.parse(Cookies.get(constant.USER_PROFILE)) : null;
        console.log(cus)
        if (cus) {
            setCustomer({
                firstName: cus.firstName, lastName: cus.lastName, contactNo: cus.contactNo, email: cus.email
            });
        }
        dispatch(setLoading(false));
    }, []);

    const allTImeSlots = () => {
        dispatch(setLoading(true));

        let temp = []
        getAllTimeSLots().then(res => {

            dispatch(setLoading(false));
            res.data.records.map((rec, index) => {
                console.log(rec)
                temp.push(<Option value={rec.id}>{rec.name}</Option>)
            })
            setTimeSlots(temp)
        }).catch(c => {
            console.log(c)
            dispatch(setLoading(false));
            customToastMsg('Time slots have some issues,Please try again later', 0)
        })
    }

    const onBillingAddressChange = (e) => {
        setUseSameAddress(e.target.checked);
        let shipping = shippingAddress
        if (e.target.checked) {
            setBillingAddress({
                houseNo: shipping.houseNo,
                city: shipping.city,
                cityLabel: shipping.cityLabel,
                streetName1: shipping.streetName1,
                streetName2: shipping.streetName2
            });
        }
    }

    const getAllCitiesToShip = () => {
        let temp = []
        getAllOutletToDropdown().then(res => {
            res.data.records.map((city, index) => {
                let tt = {
                    lat: 'ew', lan: 'ew1',
                }
                temp.push(<Option key={`${city.longitude},${city.latitude
                },${city.circleRadius}`} radius={city.circleRadius} value={city.id}>{city.name}</Option>)
            })
            setAllCities(temp)
        })
    }

    const checkoutWithConfirmation = () => {

        customer.firstName === '' ? customToastMsg('Customer first name  cannot be empty ', 0) :
            customer.lastName === '' ? customToastMsg('Customer last name cannot be empty ', 0) :
                customer.contactNo === '' ? customToastMsg('Contact no cannot be empty ', 0) :
                    customer.email === '' ? customToastMsg('Email cannot be empty ', 0) :
                        shippingAddress.streetName1 === '' ? customToastMsg('Address line name of delivery address cannot be empty ', 0) :
                            shippingAddress.city === '' ? customToastMsg('City of delivery address cannot be empty ', 0) :
                                !eligibility ? customToastMsg(<>Use <ConfigProvider
                                        theme={{
                                            components: {
                                                Button: {
                                                    color: '#00ad4e',
                                                    borderColorDisabled: '#00ad4e',
                                                    defaultActiveBorderColor: '#00ad4e',
                                                },
                                            },
                                        }}
                                    ><Button className='text-success' disabled>set up exact
                                        location</Button> button to check you are in eligible delivery are from google
                                        map </ConfigProvider></>, 0) :
                                    billingAddress.streetName1 === '' ? customToastMsg('Address line name of billing address cannot be empty ', 0) :
                                        billingAddress.city === '' ? customToastMsg('City of billing address cannot be empty ', 0) :
                                            selectedTimeSlot === '' ? customToastMsg('You have to select a time to deliver your order ', 0) :
                                                orderDate === '' ? customToastMsg('You have to select a date to complete your order ', 0) :
                                                    selectedDeliveryMethod === '' ? customToastMsg('You have to select a delivery method to complete your order ', 0) :
                                                        selectedPaymentMethod === '' ? customToastMsg('You have to select a payment method to complete your order', 0) :
                                                            confirmDetailsTOProcess()

    }
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://test-seylan.mtf.gateway.mastercard.com/static/checkout/checkout.min.js';
        script.setAttribute('data-error', 'errorCallback');
        script.setAttribute('data-cancel', 'cancelCallback');
        document.body.appendChild(script);

        // Define the callback functions
        window.errorCallback = () => {
            console.error('Payment error occurred');
            // Add custom error handling logic here
        };

        window.cancelCallback = () => {
            console.warn('Payment was cancelled');
            // Add custom cancel handling logic here
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const confirmDetailsTOProcess = () => {
        dispatch(setLoading(true));
        let packageDetails = JSON.parse(localStorage.getItem(constant.CART_LIST))
        let isLog = localStorage.getItem(constant.ACCESS_TOKEN)
        const transformedPackages = packageDetails?.map(packageDetail => {
            console.log(packageDetail)
            const transformedAddons = packageDetail?.addonDetails?.map(addon => ({
                qty: addon.qty,
                portionTypeId: addon?.selectedAddon[0]?.id,
                subProductId: addon.id,
                cuttingMethodId: addon?.cuttingMethod?.id
            }));
            console.log(transformedAddons)
            return {
                packageId: packageDetail.prodId, addOns: transformedAddons, qty: packageDetail.qty
            };
        });

        let temp;
        temp = isLog ?
            {
                "shippingAddress": {
                    "address": `${shippingAddress.houseNo ? shippingAddress.houseNo + ', ' : ''}${shippingAddress.streetName1 ? shippingAddress.streetName1 + ', ' : ''}${shippingAddress.streetName2 ? shippingAddress.streetName2 + ', ' : ''}${shippingAddress.cityLabel ? shippingAddress.cityLabel : ''}`,
                    "lat": deliveryLocation?.lat,
                    "lang": deliveryLocation?.lag,
                },
                "billingAddress": {
                    "address": `${billingAddress.houseNo ? billingAddress.houseNo + ', ' : ''}${billingAddress.streetName1 ? billingAddress.streetName1 + ', ' : ''}${billingAddress.streetName2 ? billingAddress.streetName2 + ', ' : ''}${billingAddress.cityLabel ? billingAddress.cityLabel : ''}`,
                    "lat": deliveryLocation?.lat,
                    "lang": deliveryLocation?.lag,
                },
                "paymentMethodId": selectedPaymentMethod,
                "deliveryType": selectedDeliveryMethod,
                "orderDate": orderDate,
                "timeSlotId": selectedTimeSlot,
                "packages": transformedPackages,
                "language": selectedLanguage,
            } :
            {
                "shippingAddress": {
                    "address": `${shippingAddress.houseNo ? shippingAddress.houseNo + ', ' : ''}${shippingAddress.streetName1 ? shippingAddress.streetName1 + ', ' : ''}${shippingAddress.streetName2 ? shippingAddress.streetName2 + ', ' : ''}${shippingAddress.cityLabel ? shippingAddress.cityLabel : ''}`,
                    "lat": deliveryLocation?.lat,
                    "lang": deliveryLocation?.lag,
                },
                "billingAddress": {
                    "address": `${billingAddress.houseNo ? billingAddress.houseNo + ', ' : ''}${billingAddress.streetName1 ? billingAddress.streetName1 + ', ' : ''}${billingAddress.streetName2 ? billingAddress.streetName2 + ', ' : ''}${billingAddress.cityLabel ? billingAddress.cityLabel : ''}`,
                    "lat": deliveryLocation?.lat,
                    "lang": deliveryLocation?.lag,
                },
                "paymentMethodId": selectedPaymentMethod,
                "deliveryType": selectedDeliveryMethod,
                "orderDate": orderDate,
                "timeSlotId": selectedTimeSlot,
                "packages": transformedPackages,
                "language": selectedLanguage,
                "customer": {
                    "firstName": customer.firstName,
                    "lastName": customer.lastName,
                    "email": customer.email,
                    "contactNo": customer.contactNo,
                },
            }

        orderService.placeOrderAsPackage(temp).then(res => {
            console.log(res.data?.paymentResponse?.pgDomain, res.data)
            if (res.data.paymentResponse) {
                document.getElementById("pg_instance_id").value = res.data?.paymentResponse.pgInstanceId;
                document.getElementById("merchant_id").value = res.data?.paymentResponse.merchantId;
                document.getElementById("perform").value = res.data?.paymentResponse.perform;
                document.getElementById("currency_code").value = res.data?.paymentResponse.currencyCode;
                document.getElementById("amount").value = res.data.order.total * 100;
                document.getElementById("merchant_reference_no").value = res.data?.paymentResponse.merchantReferenceNo;
                document.getElementById("order_desc").value = "test";
                document.getElementById("message_hash").value = res.data?.paymentResponse.messageHash;
                document.getElementById("merchant_response_url").value = `${URL_REMOTE}/api/seylan/wibmo/webhook`;

                document.merchantForm.action = `https://${res.data?.paymentResponse?.pgDomain}/AccosaPG/verify.jsp`;

                console.log(`https://${res.data?.paymentResponse?.pgDomain}/AccosaPG/verify.jsp`)
                document.merchantForm.submit();

            } else {
                router.push(`/order-status/${res.data.id}`)
                localStorage.setItem('orderNumber', res.data.orderId);
                dispatch(setLoading(false));
            }


        }).catch(c => {
            console.log(c)
            customToastMsg(c.message, 0);
            dispatch(setLoading(false));
        })
    }


    const disabledDate = (current) => {
        const today = moment().startOf('day');
        const oneWeekFromToday = moment().add(7, 'days').startOf('day');
        return current && (current < today || current > oneWeekFromToday);
    };

    const loadPaymentAndDeliveryMethods = () => {
        dispatch(setLoading(true));
        orderService.getAllPaymentAndDeliveryMethod().then(res => {
            setDeliveryMethods(res.data?.deliveryTypes)
            console.log(res?.data?.deliveryTypes[0].id)
            setSelectedDeliveryMethods(res?.data?.deliveryTypes[0].id)
            setSelectedPaymentMethod(res?.data?.paymentMethods[0].id)
            setPaymentMethods(res.data?.paymentMethods)
            dispatch(setLoading(false));
        }).catch(c => {
            dispatch(setLoading(false));
            customToastMsg('Sorry,Try again later', 0)
        })
    }
    const loadPaymentMethods = () => {

    }

    return (<CommonLayout>
        <div className="checkout">

            <div className="message">
                <h2>Transaction is being processed,<br/>Please wait...</h2>
            </div>
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

            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#00ad4e',
                        colorIcon: '#00ad4e'
                    },
                    components: {
                        Select: {
                            selectorBg: 'transparent',
                            clearBg: "#542322",
                            optionSelectedBg: "rgba(87,190,131,0.61)",
                        },
                        Avatar: {
                            groupBorderColor: '#00ad4e'
                        }, defaultBg: '#00ad4e'
                    },
                }}
            >

                <Container className="checkout-container">
                    <Row>
                        <Col className='mb-3' md={24} lg={24} xl={24}>
                            {/*<h1>Dilanjana</h1>*/}
                            <Breadcrumb
                                items={[{
                                    title: 'Home',
                                }, {
                                    title: <span style={{cursor: "pointer"}} onClick={() => {
                                        dispatch(setLoading(true));
                                        router.push('/cart')
                                    }}> Cart </span>,
                                }, {
                                    title: 'Checkout',
                                }

                                ]}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={24} md={24} lg={24}>
                            <Card className="checkout-card-wrapper">
                                <CardBody>
                                    <Row>

                                        <Col sm={24} md={16} lg={16}>
                                            <h2 className='topic-checkout'>How would you like to have your
                                                order?</h2>
                                            <div className="user-details">

                                                <h5>Customer Details </h5>
                                                <Form>
                                                    <FormGroup row>
                                                        <Col md={12} lg={12}>
                                                            <Label>First name <span className='text-danger'>*</span>
                                                            </Label>
                                                            <Input
                                                                value={customer.firstName}
                                                                placeholder="Enter your first name"
                                                                size="large"
                                                                onChange={(e) => setCustomer({
                                                                    ...customer, firstName: e.target.value
                                                                })}
                                                            />
                                                        </Col>
                                                        <Col md={12} lg={12}>
                                                            <Label>Last name <span
                                                                className='text-danger'>*</span></Label>
                                                            <Input
                                                                value={customer.lastName}
                                                                placeholder="Enter your last name"
                                                                size="large"
                                                                onChange={(e) => setCustomer({
                                                                    ...customer, lastName: e.target.value
                                                                })}
                                                            />
                                                        </Col>
                                                    </FormGroup>

                                                    <FormGroup row>
                                                        <Col md={12} lg={12}>
                                                            <Label>Contact number <span className='text-danger'>*</span></Label>
                                                            <Input
                                                                value={customer.contactNo}
                                                                placeholder="Enter your contact number"
                                                                size="large"
                                                                onChange={(e) => setCustomer({
                                                                    ...customer, contactNo: e.target.value
                                                                })}
                                                            />
                                                        </Col>
                                                        <Col md={12} lg={12}>
                                                            <Label>Email <span className='text-danger'>*</span></Label>
                                                            <Input
                                                                value={customer.email}
                                                                placeholder="Enter your email"
                                                                size="large"
                                                                onChange={(e) => setCustomer({
                                                                    ...customer, email: e.target.value
                                                                })}
                                                            /></Col>
                                                    </FormGroup>


                                                </Form>

                                            </div>


                                            <div className="address-wrapper">
                                                <h5>Delivery Address </h5>
                                                <Form>
                                                    <FormGroup row>
                                                        <Col md={12} lg={12}>
                                                            <Label>House no </Label>
                                                            <Input
                                                                value={shippingAddress.houseNo}
                                                                placeholder="Houese no"
                                                                size="large"
                                                                onChange={(e) => setShippingAddress({
                                                                    ...shippingAddress, houseNo: e.target.value
                                                                })}
                                                            />
                                                        </Col>
                                                        <Col md={12} lg={12}>
                                                            <Label>Address line 01 <span
                                                                className='text-danger'>*</span></Label>
                                                            <Input
                                                                value={shippingAddress.streetName1}
                                                                placeholder="Address line 01"
                                                                size="large"
                                                                onChange={(e) => setShippingAddress({
                                                                    ...shippingAddress, streetName1: e.target.value
                                                                })}
                                                            />
                                                        </Col>
                                                    </FormGroup>

                                                    <FormGroup row>
                                                        <Col md={12} lg={12}>
                                                            <Label>Address line 02</Label>
                                                            <Input
                                                                value={shippingAddress.streetName2}
                                                                placeholder="Address line 02"
                                                                size="large"
                                                                onChange={(e) => setShippingAddress({
                                                                    ...shippingAddress, streetName2: e.target.value
                                                                })}
                                                            />
                                                        </Col>

                                                        <Col md={12} lg={12}>
                                                            <Label>City (Outlet)<span
                                                                className='text-danger'>*</span></Label>

                                                            <Select
                                                                value={shippingAddress.city === "" ? 'City' : shippingAddress.city}
                                                                size='large'
                                                                className=' w-100'
                                                                showSearch
                                                                style={{width: 200}}
                                                                placeholder="City"
                                                                optionFilterProp="children"
                                                                onChange={(e, option) => {
                                                                    // cityLabel
                                                                    console.log(option)
                                                                    setOutletId(option.value)
                                                                    setOutletRadius(option.radius)
                                                                    setShippingAddress({
                                                                        ...shippingAddress,
                                                                        city: e,
                                                                        cityLabel: option.children
                                                                    })
                                                                    let split_coordinates = option.key.split(',')
                                                                    let temp = [{
                                                                        lang: split_coordinates[0],
                                                                        lat: split_coordinates[1]
                                                                    }]
                                                                    setSelectedCityLanLat(temp)
                                                                }}
                                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                                {allCities}
                                                            </Select>
                                                        </Col>

                                                    </FormGroup>


                                                    <FormGroup row>
                                                        <Col md={24} lg={24}>
                                                            <Checkbox checked={useSameAddress}
                                                                      onChange={onBillingAddressChange}>Use delivery
                                                                address
                                                                as the billing address.</Checkbox>
                                                        </Col>

                                                    </FormGroup>

                                                    <Button onClick={() => {
                                                        selectedCityLanLat.length === 0 ? customToastMsg('You have to select your delivery city first', 2) : setMapOpen(true)
                                                    }}>
                                                        Set up exact location
                                                    </Button>
                                                </Form>

                                                <LocationCheck radius={outletRadius} outletId={outletId}
                                                               cityDetails={selectedCityLanLat}
                                                               isOpen={mapOPen}
                                                               toggleModal={(data) => {
                                                                   setMapOpen(!mapOPen)
                                                                   if (data) {
                                                                       setEligibility(true)
                                                                       setDeliveryLocation(data)

                                                                   } else {
                                                                       setEligibility(false)


                                                                   }

                                                               }}/>
                                            </div>

                                            <div className="address-wrapper">
                                                <h5>Billing Address </h5>
                                                <Form>
                                                    <FormGroup row>
                                                        <Col md={12} lg={12}>
                                                            <Label>House no</Label>
                                                            <Input
                                                                value={billingAddress.houseNo}
                                                                placeholder="House no"
                                                                size="large"
                                                                onChange={(e) => {
                                                                    setUseSameAddress(false)
                                                                    setBillingAddress({
                                                                        ...billingAddress, houseNo: e.target.value
                                                                    })
                                                                    setUseSameAddress(false)
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col md={12} lg={12}>
                                                            <Label>Address line 01 <span
                                                                className='text-danger'>*</span></Label>
                                                            <Input
                                                                value={billingAddress.streetName1}
                                                                placeholder="Address line 01"
                                                                size="large"
                                                                onChange={(e) => {
                                                                    setBillingAddress({
                                                                        ...billingAddress, streetName1: e.target.value
                                                                    })
                                                                    setUseSameAddress(false)
                                                                }}
                                                            />
                                                        </Col>
                                                    </FormGroup>

                                                    <FormGroup row>
                                                        <Col md={12} lg={12}>
                                                            <Label>Address line 02</Label>
                                                            <Input
                                                                value={billingAddress.streetName2}
                                                                placeholder="Address line 02"
                                                                size="large"
                                                                onChange={(e) => {
                                                                    setBillingAddress({
                                                                        ...billingAddress, streetName2: e.target.value
                                                                    })
                                                                    setUseSameAddress(false)
                                                                }}
                                                            />
                                                        </Col>

                                                        <Col md={12} lg={12}>
                                                            <Label>City (Outlet)<span
                                                                className='text-danger'>*</span></Label>

                                                            <Select
                                                                value={billingAddress.city === "" ? 'City' : billingAddress.city}
                                                                size='large'
                                                                className=' w-100'
                                                                showSearch
                                                                style={{width: 200}}
                                                                placeholder="City"
                                                                optionFilterProp="children"
                                                                onChange={(e, option) => {
                                                                    setUseSameAddress(false)
                                                                    setBillingAddress({
                                                                        ...billingAddress,
                                                                        city: e,
                                                                        cityLabel: option.children
                                                                    })
                                                                }}
                                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                                {allCities}
                                                            </Select>
                                                        </Col>

                                                    </FormGroup>

                                                </Form>

                                            </div>

                                            <div className="date-wrapper">
                                                <h5>Order Details </h5>
                                                <Form>
                                                    <FormGroup row>
                                                        <Col md={12} lg={12}>
                                                            <Label>Select time slot <span
                                                                className='text-danger'>*</span></Label>
                                                            <Select
                                                                size='large'
                                                                className=' w-100'
                                                                showSearch
                                                                style={{width: 200}}
                                                                placeholder="Time slot"
                                                                optionFilterProp="children"
                                                                onChange={(e, option) => {
                                                                    setSelectedTimeSlot(e)
                                                                }}
                                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                                {timeSlots}
                                                            </Select>
                                                        </Col>
                                                        <Col md={12} lg={12}>
                                                            <Label>Select order date <span
                                                                className='text-danger'>*</span></Label>
                                                            <DatePicker disabledDate={disabledDate} size='large'
                                                                        className='w-100'
                                                                        onChange={(date, dateString) => {
                                                                            setOrderDate(moment(dateString).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
                                                                        }}/>
                                                        </Col>
                                                    </FormGroup>

                                                    <FormGroup row>
                                                        <Col md={24} lg={24}>
                                                            <Col className=' w-100 mt-2 ' sm={24} md={24} lg={24}>
                                                                <Label>Preferred Language <span
                                                                    className='text-danger'>*</span></Label>

                                                            </Col>
                                                            <Radio.Group value={selectedLanguage}
                                                                         buttonStyle="outline">

                                                             <span style={{
                                                                 width: 'fit-content',
                                                                 padding: 0,
                                                                 marginRight: '12px',
                                                                 marginTop: '5px'
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
                                                                                setSelectedLanguage(value.target.value);
                                                                            }}
                                                                            value={'ENGLISH'}>
                                                                           English </Radio>
                                                                     </ConfigProvider>
                                                                    </span>


                                                                <span style={{
                                                                    width: 'fit-content',
                                                                    padding: 0,
                                                                    marginRight: '12px',
                                                                    marginTop: '5px'
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
                                                                                setSelectedLanguage(value.target.value);
                                                                            }}
                                                                            value={'SINHALA'}>
                                                                           සිංහල </Radio>
                                                                     </ConfigProvider>
                                                                    </span>

                                                                <span style={{
                                                                    width: 'fit-content',
                                                                    padding: 0,
                                                                    marginRight: '12px',
                                                                    marginTop: '5px'
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
                                                                                setSelectedLanguage(value.target.value);
                                                                            }}
                                                                            value={'TAMIL'}>
                                                                           தமிழ்</Radio>
                                                                     </ConfigProvider>
                                                                    </span>
                                                            </Radio.Group>
                                                        </Col>

                                                    </FormGroup>

                                                </Form>

                                            </div>
                                            <div className="date-wrapper">
                                                <h5>Payment Details </h5>
                                                <Form>
                                                    <FormGroup row>
                                                        <Col md={12} lg={12}>
                                                            <Col className=' w-100 mt-2 ' sm={24} md={24} lg={24}>
                                                                <Label>Preferred delivery option <span
                                                                    className='text-danger'>*</span></Label>
                                                            </Col>
                                                            <Radio.Group value={selectedDeliveryMethod}
                                                                         buttonStyle="outline">

                                                                {deliveryMethods.map((del, index) => <span style={{
                                                                    width: 'fit-content',
                                                                    padding: 0,
                                                                    marginRight: '12px',
                                                                    marginTop: '5px'
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

                                                                                setSelectedDeliveryMethods(value.target.value);
                                                                                console.log('dila', value.target.value)
                                                                            }}
                                                                            value={del.id}>

                                                                            <Avatar className='mx-1'
                                                                                    style={selectedDeliveryMethod === del.id ? {
                                                                                        backgroundColor: '#00ad4e',
                                                                                        color: '#fff',
                                                                                    } : {
                                                                                        backgroundColor: '#dbfcea',
                                                                                        color: '#2f2f2f',
                                                                                    }} icon={del.type === 'DELIVERY' ?
                                                                                <Truck size={16}/> :
                                                                                <Package size={16}/>}/>

                                                                            {del.name} </Radio>
                                                                     </ConfigProvider>
                                                                    </span>)}

                                                            </Radio.Group>
                                                        </Col>


                                                        <Col md={12} lg={12}>
                                                            <Col className=' w-100 mt-2 ' sm={24} md={24} lg={24}>
                                                                <Label>Payment method <span
                                                                    className='text-danger'>*</span></Label>
                                                            </Col>
                                                            <Radio.Group value={selectedPaymentMethod}
                                                                         buttonStyle="outline">

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
                                                    </FormGroup>


                                                </Form>

                                            </div>

                                            <Button onClick={() => checkoutWithConfirmation()}
                                                    className={'btn-checkout w-100'}>Checkout </Button>


                                        </Col>

                                        {/*banner*/}
                                        <Col xsm={0} sm={0} md={8} lg={8}>
                                            <div className="checkout-bg-container">
                                                <div className="overlay"></div>
                                                <div className="bottom-section">
                                                    <div className="bottom-wrapper"><h4>We are ready to bring fresh
                                                        vegetables into your table</h4>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                                                            fugiat nemo non possimus quod, sequi totam voluptate
                                                            voluptatum.</p>

                                                        {/*<span>    {total} {discountedAmount}</span>*/}

                                                    </div>


                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </ConfigProvider>
        </div>
    </CommonLayout>);
};

export default Page;
