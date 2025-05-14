import React, {useEffect, useState} from "react";
import {Avatar, Button, Col, ConfigProvider, Divider, Input, Modal, Radio, Row} from "antd";
import {getSubProductDetailsById} from "@/service/subProductService";
import {customToastMsg, formatPrice} from "@/util/CommonFun";
import Image from 'next/image'
import '../../styles/addonModal.scss'
import {useDispatch} from "react-redux";
import {setLoading} from "@/redux/actions/loadingActions";

const AddonModal = ({getAddonData, isOpen, toggleModal, product, packageType}) => {
    const dispatch = useDispatch()
    const [subProdDetails, setSubProdDetails] = useState([])
    const [discountedPrice, setDiscountedPrice] = useState([])
    const [qty, setQty] = useState(1)
    const [selectAddonSize, setSelectAddonSize] = useState([])
    const [selectedCuttingMethod, setSelectedCuttingMethod] = useState([])

    useEffect(() => {
        loadData();
    }, []);


    const loadData = () => {
        dispatch(setLoading(true));

        getSubProductDetailsById(product.id).then(res => {
            let mainImage = res.data.files?.filter(image => image.isDefault === true)[0].path

            let data = {
                ...res.data,
                cuttingMethods: res.data.product.cuttingMethods,
                imagePath: mainImage,
                discountedPrice: res.data?.sellingPrice - (res.data.sellingPrice / 100) * res.data?.discount,
                productSizes: res.data.product.portionTypes
            }

            let price = 0
            if (packageType === 'cut') {
                price = res.data?.cuttingPrice - (res.data.cuttingPrice / 100) * res.data?.discount
            } else {
                console.log('raw')
                price = res.data?.sellingPrice - (res.data.sellingPrice / 100) * res.data?.discount

            }
            setDiscountedPrice(price)
            setSubProdDetails(data)
        }).catch(c => {
            customToastMsg(c.message, 0)
        }).finally(f => {
            dispatch(setLoading(false));

        })
    }


    const calculatePrice = (value) => {
        console.log(subProdDetails)
        if (packageType === 'cut') {
            console.log('have cutting')
            if (subProdDetails?.product?.unitType.name !== 'pieces') {

                let priceForSelectSize = (1000 * parseFloat(value.target.value))

                let originalPrice = subProdDetails.cuttingPrice - (subProdDetails.cuttingPrice / 100) * subProdDetails?.discount
                console.log(originalPrice * priceForSelectSize / 1000)
                setDiscountedPrice(originalPrice * priceForSelectSize / 1000)
                setQty(1)

                let obj = subProdDetails?.productSizes.filter(curr => curr.value === parseFloat(value.target.value))

                setSelectAddonSize(obj)
            } else {
                setDiscountedPrice(originalPrice)
                setQty(1)
                let obj = subProdDetails?.productSizes.filter((curr) => {
                    console.log(curr, value.target.value)
                    return curr.value === value.target.value && curr.value
                })

                setSelectAddonSize(obj)
            }

        } else {
            if (subProdDetails?.product?.unitType.name !== 'pieces') {

                let priceForSelectSize = (1000 * parseFloat(value.target.value))

                let originalPrice = subProdDetails.sellingPrice - (subProdDetails.sellingPrice / 100) * subProdDetails?.discount
                console.log(originalPrice * priceForSelectSize / 1000)
                setDiscountedPrice(originalPrice * priceForSelectSize / 1000)
                setQty(1)

                let obj = subProdDetails?.productSizes.filter(curr => curr.value === parseFloat(value.target.value))

                setSelectAddonSize(obj)
            } else {
                setDiscountedPrice(originalPrice)
                setQty(1)
                let obj = subProdDetails?.productSizes.filter((curr) => {
                    console.log(curr, value.target.value)
                    return curr.value === value.target.value && curr.value
                })

                setSelectAddonSize(obj)
            }

        }

    }


    const increaseValue = () => {
        let incrementValue = 1

        setQty(parseFloat(qty) + incrementValue);
    };

    const decreaseValue = () => {
        let decrementValue = 1
        if (qty > 1) {
            setQty(parseFloat(qty) - decrementValue);
        }
    };
    const AddToPackageAndClose = async () => {
        packageType === 'cut' && selectedCuttingMethod.length === 0 ? customToastMsg('You have to select cutting method of your add-on product', 2) :
            selectAddonSize.length === 0 ? customToastMsg('You have to select size of your add-on product', 2) :
                getAddonData({
                    'qty': qty,
                    'selectedAddon': selectAddonSize,
                    img: subProdDetails.imagePath,
                    addonPrice: discountedPrice,
                    cuttingMethod: selectedCuttingMethod
                })

    }


    const cuttingMethodSelection = (e) => {
        console.log(e)
        setSelectedCuttingMethod(e)
    }
    console.log(subProdDetails?.cuttingMethods?.length)
    return <Modal
        className='addonModal'
        style={{top: 20,}}
        title={<h1>Add-on to Package</h1>}
        open={isOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={null}
        maskClosable={false}
        width={650}>
        {/*<h5>{subProdDetails.name}</h5>*/}
        <Row>
            <Col sm={24} md={7} lg={7} xxl={7}>
                <Image className='product-img' src={subProdDetails.imagePath} width={120} height={120} alt='text'/>
            </Col>
            <Col sm={24} md={17} lg={17} xxl={17}>
                <div className="product-content-wrapper">
                    <small className={'category-name'}>{subProdDetails?.product?.name}</small>
                    <h4 className={'prod-name'}>{subProdDetails?.name}</h4>

                    <small className={'category-name'}> <b>Per 1{subProdDetails?.product?.unitType?.symbol}:</b></small>
                    <div className="priceDetails">

                        {subProdDetails.discount > 0 && <h4
                            className='real-price'>{formatPrice(packageType === 'cut' ? subProdDetails?.cuttingPrice : subProdDetails?.sellingPrice)}</h4>}
                        <h4 className='discountedPrice'>{formatPrice(discountedPrice)}</h4>
                    </div>
                    <Divider/>

                    <Row className="prod-sizes">
                        {packageType === 'cut' && <Row>
                            <Col className=' w-100 mt-2 ' sm={24} md={9} lg={9}>
                                <small className='mb-2'>Cutting method</small></Col>
                            <Col className=' w-100 mt-1 ' sm={24} md={24} lg={24}>
                                <Radio.Group className='d-flex flex-row row w-100' defaultValue="a" buttonStyle="solid">
                                    {subProdDetails?.cuttingMethods?.map((method, index) =>
                                        <span style={{
                                            width: 'fit-content',
                                            padding: 0,
                                            marginRight: '4px',
                                            marginTop: '5px'
                                        }}>
                                            <Radio.Button className='w-auto py-1 text-center h-auto'
                                                          onClick={(value) => cuttingMethodSelection(method)}
                                                          value={method.id}>
                                              <ConfigProvider
                                                  theme={{
                                                      components: {
                                                          Avatar: {
                                                              groupBorderColor: '#00ad4e'
                                                          },
                                                      },
                                                  }}
                                              >
                                                  <Avatar src={method.image.imageSizes.small}/> </ConfigProvider>
                                                {method.name} </Radio.Button>
                                        </span>
                                    )}  </Radio.Group>
                            </Col>

                        </Row>
                        }
                    </Row>

                    {subProdDetails?.productSizes &&
                        <div className="prod-sizes">
                            <small className='mb-2'>Select product size</small>
                            <Row>
                                <Col className=' w-100 mt-1 ' sm={24} md={24} lg={24}>
                                    <Radio.Group className='d-flex flex-row row w-100' defaultValue="a"
                                                 buttonStyle="solid">
                                        {subProdDetails?.productSizes?.map((sizes, index) =>
                                                <span style={{
                                                    width: 'fit-content',
                                                    padding: 0,
                                                    marginRight: '4px',
                                                    marginTop: '5px'
                                                }}>
                                            <Radio.Button className='w-auto text-center h-auto'
                                                          onClick={(value) => calculatePrice(value)}
                                                          value={sizes.value}>{sizes.label} ({sizes.value}{subProdDetails?.product?.unitType?.symbol})</Radio.Button>
                                        </span>
                                        )}  </Radio.Group>
                                </Col>
                            </Row>


                            <Row>
                                <Col className=' w-100 mt-2 ' sm={24} md={9} lg={9}>
                                    <small className='mb-2'>Quntity of Product</small>
                                    <div className="d-flex d-column button-wrapper text-center">
                                        <Button disabled={qty === 1} onClick={decreaseValue}>-</Button>
                                        <Input disabled={true} value={qty} className='text-center'/>
                                        <Button onClick={increaseValue}>+</Button>
                                    </div>

                                </Col>
                                <Col className='   w-100 mt-2 total-price-wrapper' sm={24} md={15} lg={15}>
                                    <span className="totalPrice">Total amount</span> <span
                                    className='total-amount-label'>{formatPrice(discountedPrice * qty)}</span>
                                </Col>
                            </Row>


                        </div>}
                </div>
            </Col>
        </Row>
        <Row className='w-100 mt-4'>
            <Col className='w-100' sm={24} md={24} lg={24}>
                <Button onClick={() => {
                    AddToPackageAndClose()
                }} className='w-100 addToPackage-btn'>
                    Add to Package
                </Button>
            </Col>
        </Row>

    </Modal>
}

export default AddonModal