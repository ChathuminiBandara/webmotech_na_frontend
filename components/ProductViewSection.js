"use client"
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    ConfigProvider,
    Input,
    Popconfirm,
    Popover,
    Row,
    Select,
    Tag,
    Tooltip
} from "antd";
import React, {useEffect, useState} from "react";
import "../styles/ProductViewSection.scss";
import {poppins} from "../app/fonts";

import Image from "next/image";
import {CardBody, Container} from "reactstrap";
import {customSweetAlert, customToastMsg, findDiscountedPrice, formatPrice} from "@/util/CommonFun";
import {Archive, Truck} from "react-feather";
import {
    CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DollarOutlined, DownCircleOutlined, EditOutlined,
    InfoCircleOutlined, QuestionCircleOutlined,
    RightCircleOutlined, SearchOutlined, ShoppingCartOutlined,
    SyncOutlined,
    TruckOutlined, UserOutlined
} from "@ant-design/icons";
import {getAllTimeSLots} from "@/service/timeSlotService";
import {triggerTransitionEnd} from "bootstrap/js/src/util";
import moment from "moment";
import AddonCard from "@/components/cards/AddonCard";
import {CART_LIST} from "@/util/constants";
import AddToCartConfirm from "@/components/modals/AddToCartConfirm";
import {useDispatch} from "react-redux";
import {setLoading} from "@/redux/actions/loadingActions";

const ProductViewSection = ({prodData, packageType}) => {

    const dispatch = useDispatch()

    const [value, setValue] = useState(1);
    const [timeSlots, setTimeSlots] = useState([]);
    const [addonDetails, setAddonDetails] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [cartAddonDetails, setCartAddonDetails] = useState([]);
    const [filteredAddons, setFilteredAddons] = useState([]);
    const [isFilteredAddons, setIsFilteredAddons] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const truncatedLength = 500;

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    const needsTruncation = prodData?.description?.length > truncatedLength;

    const truncatedDescription = needsTruncation
        ? prodData?.description.substring(0, truncatedLength) + '...'
        : prodData?.description;


    useEffect(() => {
        getAllTImeDetails();
    }, []);

    useEffect(() => {

    }, [addonDetails]);

    const getAllTImeDetails = () => {
        dispatch(setLoading(true));
        getAllTimeSLots().then(res => {
            let temp = []

            res.data.records.map((times, index) => {
                temp.push({
                    value: times.id,
                    label: times.name,
                    description: times.description,
                    minimumTime: times.minimumTime,
                })
            })
            setTimeSlots(temp)
            dispatch(setLoading(false));
        }).catch(c => {
            customToastMsg(c.message, 0)
            dispatch(setLoading(false));
        })
    }

    const increaseValue = () => {
        let incrementValue = 1

        setValue(parseFloat(value) + incrementValue);
    };

    const decreaseValue = () => {
        let decrementValue = 1
        if (value > 0) {
            setValue(parseFloat(value) - decrementValue);
        }
    };

    const removeAddon = (data) => {
        let temp = []
        if (data.cuttingMethod.name) {
            temp = addonDetails.filter(item => {
                return !(item.id === data.id && item.cuttingMethod.name === data.cuttingMethod.name);
            })
        } else {
            temp = addonDetails.filter(item => {
                return !(item.id === data.id);
            })
        }

        setAddonDetails(temp)
    }

    const getAddonQTyAndDetails = (data) => {
        let temp = addonDetails.concat(data)
        setAddonDetails(temp)
    };

    const addIntoCart = () => {
        let totalValue = 0
        addonDetails.map((addon, index) => {
            totalValue += addon?.addonPrice * addon.qty
        })
        totalValue += findDiscountedPrice(prodData.price, prodData.discount) * value
        let dataToCart = {
            prodName: prodData.name,
            prodId: prodData.id,
            image: prodData.files?.filter(image => image.isDefault === true)[0].path,
            qty: value,
            price: prodData.price,
            discount_percentage: prodData.discount,
            data: prodData,
            addonDetails: addonDetails,
            orderTotal: totalValue,
            discounted_Price: findDiscountedPrice(prodData.price, prodData.discount)
        };

        setCartAddonDetails(dataToCart)
        openConfirmPackage();
    }


    const buyNowQuickFunction = () => {
        let totalValue = 0
        addonDetails.map((addon, index) => {
            totalValue += addon?.addonPrice * addon.qty
        })
        let dataToCart = {
            prodName: prodData.name,
            prodId: prodData.id,
            image: prodData.files?.filter(image => image.isDefault === true)[0].path,
            qty: value,
            price: prodData.price,
            discount_percentage: prodData.discount,
            data: prodData,
            addonDetails: addonDetails,
            orderTotal: totalValue,
            discounted_Price: findDiscountedPrice(prodData.price, prodData.discount)
        };
        console.log(dataToCart)
        setCartAddonDetails(dataToCart)
        openConfirmPackage();
    }


    const scrollIntoAddons = () => {
        const element = document.getElementById('scrollDown');
        element.scrollIntoView({
            behavior: 'smooth',
            block: "end",
            inline: "nearest"
        });
    }

    const openConfirmPackage = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setIsFilteredAddons(prodData?.addOns?.length > 0)
        filterAddons();
    }, [searchQuery, prodData]);


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterAddons = () => {

        const filtered = prodData.addOns?.filter(addon => {
            return addon?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredAddons(filtered);

    };
    return (<div id="cart_sec" className={poppins.className}>
        {isOpen && <AddToCartConfirm removeAddon={(data) => removeAddon(data)} data={cartAddonDetails}
                                     toggleModal={() => {
                                         openConfirmPackage();

                                     }} isOpen={isOpen}/>}

        {prodData.id && <Container>
            <Row>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Breadcrumb
                        separator=">"
                        items={[{
                            title: 'Store', href: '/package-store/raw',
                        }, {
                            title: `${prodData.category?.name}`,
                            // href: `/product-view/${prodData?.packageType}/${prodData.category?.name}`,
                        }, {
                            title: `${prodData.name}`
                            // href: `/package-details/${prodData.slug}`,
                        }

                        ]}
                    />
                </Col>

                <Col span={10} xxl={10} xl={10} lg={10} md={24} sm={24} xs={24}
                     id="cart_sec_img_col"
                >
                    <div id="cs_product_img_card">
                        <Image
                            id="product_img"
                            src={prodData?.files[0]?.path}
                            alt="image"
                            width={520}
                            height={590}
                        />
                        <div id="sub_product_img_div">
                            <ul style={{
                                "--liCount": prodData?.subProducts?.length,
                                "--liCountMinus": -(prodData?.subProducts?.length)
                            }}>
                                {prodData?.subProducts?.map((subProduct, index) => {
                                    const defaultImage = subProduct.files?.find(file => file.isDefault);
                                    return (
                                        <li style={{"--i": index}}>
                                            <Image
                                                src={defaultImage?.path || ''}
                                                alt="subProductImg"

                                                id={prodData?.subProducts.length < 8 ? "subProductImg" : "subProductImgMini"}
                                                width={100}
                                                height={80}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col span={24} xxl={13} xl={13} lg={13} md={24} sm={24} xs={24} id="cart_sec_detail_col">
                    <Row id="cs_detail_row">

                        <h1 className='product-name'>{prodData.name}</h1>
                        {prodData.discount > 0 ? <div className='d-flex mt-3 justify-content-between'>
                            <div className='d-flex '>
                                <h5 className='discounted-price'>{formatPrice(prodData.price)}</h5>
                                <h5 className='real-price'>{formatPrice(prodData.price - (prodData.price / 100) * prodData.discount)}</h5>

                            </div>

                        </div> : <div></div>}
                        {/*<div className='product-description'*/}
                        {/*     dangerouslySetInnerHTML={{__html: prodData.description}}/>*/}
                        <div
                            className='product-description'
                            style={{maxHeight: isExpanded ? 'none' : '250px', overflow: 'hidden'}}
                            dangerouslySetInnerHTML={{__html: isExpanded ? prodData.description : truncatedDescription}}
                        />
                        {needsTruncation && (
                            <small className='w-100 text-secondary text-end' onClick={handleToggle}>
                                {isExpanded ? <small> Show less <DownCircleOutlined
                                    style={{fontSize: '10px'}}/></small> : <small> Read more <DownCircleOutlined
                                    style={{fontSize: '10px'}}/></small>}
                            </small>
                        )}


                        <Row className="core-details-spec">

                            <Col sm={12} md={8} lg={7} className='details-view d-flex flex-column text-start'>

                                <span><RightCircleOutlined
                                    style={{fontSize: '12px', marginRight: '8px', color: 'green'}}/>Category :</span>
                                <span><RightCircleOutlined style={{
                                    fontSize: '12px',
                                    marginRight: '8px',
                                    color: 'green'
                                }}/>Availability :</span>
                            </Col>
                            <Col sm={12} md={8} lg={7} className='details-view d-flex flex-column text-start'>
                                <span>Essential Pack</span>
                                <span> <CheckCircleOutlined style={{fontSize: '16px', color: 'green'}}/> In Stock</span>
                            </Col>
                            <Col sm={24} md={16} lg={24} className='details-free-dev d-flex flex-column text-start'>
                                <span><RightCircleOutlined
                                    style={{fontSize: '12px', marginRight: '8px', color: 'green'}}/>Free Delivery Available</span>
                            </Col>

                        </Row>


                        <Row className="btn-wrapper">
                            <Col md={6} lg={6} xxl={5} className='qty-section  '>

                                <span>Quntity</span>

                                <div className="d-flex d-column button-wrapper text-center">
                                    <Button disabled={value === 1} onClick={decreaseValue}>-</Button>
                                    <Input disabled={true} value={value} className='text-center'/>
                                    <Button onClick={increaseValue}>+</Button>
                                </div>


                            </Col>


                        </Row>
                        <Row className="btn-wrapper-cart d-flex justify-content-between">

                            {filteredAddons?.length > 0 && <Col sm={24} lg={11}>
                                <Button onClick={() => {
                                    buyNowQuickFunction()
                                }} className='btn-buyNow d-flex justify-content-center align-items-baseline'>Buy
                                    now <DollarOutlined/></Button>
                            </Col>
                            }
                            {filteredAddons?.length > 0 && <Col sm={24} md={11} lg={11}>
                                <Button onClick={() => {
                                    scrollIntoAddons()
                                }} outline className='btn-customize d-flex justify-content-center align-items-baseline'>
                                    Customize your package <EditOutlined/>
                                </Button>
                            </Col>}
                            <Col md={filteredAddons?.length > 0 ? 24 : 11}
                                 lg={filteredAddons?.length > 0 ? 24 : 11}>
                                <Button onClick={() => {
                                    addIntoCart()
                                }} outline className='btn-addToCart d-flex justify-content-center align-items-baseline'>Add
                                    to
                                    cart <ShoppingCartOutlined/></Button>
                            </Col>
                        </Row>

                    </Row>
                </Col>

            </Row>

            <Row>
                <Col className='addon-topic' span={24} xxl={4} xl={4} lg={4} md={4} sm={12}>Ingredients</Col>
                <Row id="vege_list_row">{prodData?.subProducts?.map((subProduct, index) => {
                    return (<>
                        <Col className='border-tbl' span={24} xxl={4} xl={6} lg={6} md={6} sm={12}
                             xs={12}>

                            <span className='d-flex  justify-content-evenly align-items-center'>
                                  <Col sm={6}>                                <span
                                      className='ingredients-index'>{index < 9 ? '0' + (index + 1) : (index + 1)}</span>
                            </Col>
                                   <Col sm={18} className={'d-flex align-items-center'}>
                                <Image
                                    className='ingredients-img'
                                    style={{objectFit: 'contain'}} alt='subproduct'
                                    src={subProduct.files?.find(file => file.isDefault).path} width={50}
                                    height={50}/> <b
                                       className='mx-2'>{subProduct.name.length > 20 ?
                                       <Tooltip placement="bottom" title={subProduct.name}>
                                           <span>   {subProduct.name.slice(0, 20) + '...'}</span>
                                       </Tooltip> : subProduct.name}</b>
                                   </Col>
                                   </span>
                        </Col>
                        <Col className={` border-tbl border-tbl-txt`}
                             span={24} xxl={2} xl={2} lg={2} md={2} sm={12}
                             xs={12}>
                            <span>{subProduct.qty}{subProduct.unitType.symbol}</span>
                        </Col>
                    </>);
                })}
                </Row>
            </Row>

            {addonDetails.length > 0 && <Row className='mt-4'>
                <Col className='addon-topic' span={24} xxl={4} xl={4} lg={4} md={4} sm={12}>Add-on Products</Col>
                <Row className="addon-row">
                    {addonDetails?.map((subProduct) => {
                        return (< >
                            <Col className='d-flex align-items-center border-tbl' span={24} xxl={4} xl={4} lg={4} md={4}
                                 sm={12}
                                 xs={12}>
                            <span className='d-flex align-items-center'><Image style={{objectFit: 'contain'}}
                                                                               alt='subproduct' src={subProduct.image}
                                                                               width={50}
                                                                               height={50}/> <b
                                className='mx-2'>{subProduct.name}</b></span>
                            </Col>
                            <Col className='border-tbl border-tbl-txt' span={24} xxl={4} xl={4} lg={4} md={4} sm={12}
                                 xs={12}>
                                <span>{subProduct.selectedAddon[0].label} {subProduct?.cuttingMethod?.name && `(${subProduct?.cuttingMethod?.name})`} x {subProduct.qty}</span>
                                <Popconfirm
                                    title="Remove this from package"
                                    description="Are you sure to romeve this add-on from this package?"
                                    onConfirm={(e) => {

                                        removeAddon(subProduct)
                                    }}
                                    okText='Delete'
                                    okType='danger'
                                    icon={
                                        <QuestionCircleOutlined
                                            style={{
                                                color: 'red',
                                            }}
                                        />
                                    }
                                > <CloseCircleOutlined size={14} className='position-absolute close-btn '
                                                       style={{right: '8px', top: '5px'}}/>
                                </Popconfirm>

                            </Col>
                        </ >);
                    })}
                </Row>
            </Row>}


            {/*{filteredAddons?.length > 0 && <Row className='mt-5'>*/}
            {isFilteredAddons && <Row className='mt-5'>
                <Col md={16} lg={16}><h2>Do you want add more things ?</h2></Col>

                <Col className='text-end' md={8} lg={8}>

                    <Input
                        onChange={handleSearch}
                        value={searchQuery}
                        className='search-add-ons' placeholder="Search Product" prefix={<SearchOutlined/>}/>
                </Col>
                {filteredAddons?.length > 0 ? <Row
                        className={`d-flex ${filteredAddons?.length < 4 ? 'justify-content-start' : 'justify-content-between'} w-100`}>
                        {filteredAddons?.map((addOn, index) => <AddonCard
                            packageType={packageType}
                            details={addOn}
                            getAddonQTyAndDetails={(data) => getAddonQTyAndDetails(data)}
                        />)}


                    </Row> :
                    <Row
                        className={`d-flex ${filteredAddons?.length < 4 ? 'justify-content-start' : 'justify-content-between'} w-100`}>
                        <Row className='w-100'>
                            <Card style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
                                  className='mt-3 p-3 w-100 text-center cart-view-card'>
                                <CardBody>
                                    <Archive color={'rgba(178,178,178,0.47)'} size={36}/>
                                    <p>Your cart is empty!</p>
                                </CardBody></Card>
                        </Row>


                    </Row>}
            </Row>

            }
        </Container>}
        <div id={'scrollDown'}></div>
    </div>);
};

export default ProductViewSection;
