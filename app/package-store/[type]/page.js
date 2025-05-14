"use client"
import CommonLayout from "../../layouts/commonLayout";
import {Breadcrumb, Button, Col, Input, Pagination, Row, Drawer, Slider, ConfigProvider, Skeleton, Tour} from "antd";
import {Card, CardBody} from "reactstrap";
import React, {useEffect, useRef, useState} from "react";
import '../../../styles/storeView.scss'
import {Sliders} from 'react-feather'
import {Checkbox} from 'antd';
import * as categoriesService from "../../../service/categoriesService";
import {poppins} from "../../fonts";
import defaultImage from "../../../public/assets/default-vegepack.jpg";
import {useDispatch} from "react-redux";
import {setLoading} from "@/redux/actions/loadingActions";
import {customToastMsg, formatPrice} from "@/util/CommonFun";
import CategoryCard from "@/components/cards/CategoryCard";
import {Tabs} from 'antd';
import {AndroidOutlined, AppleOutlined} from "@ant-design/icons";
import {useRouter, usePathname} from "next/navigation";
import ladyChef1 from '../../../public/assets/tour-image/lady checf1.png'
import ladyChef2 from '../../../public/assets/tour-image/lady checf2.png'
import Image from "next/image";
import Lottie from "react-lottie";
import animatedGirl from "@/public/assets/lottie/Pointing.json";
import thinkingGirl from "@/public/assets/lottie/Thinking 1.json";

const Page = ({params}) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter();

    const [familyPackCardData, setFamilyPackCardData] = useState([]);
    const [tourStatus, setTourStatus] = useState(true);
    const [familyPackCardDataCut, setFamilyPackCardDataCut] = useState([]);
    const [searchProd, setSearchProd] = useState('');
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 15000]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isDiscounted, setIsDiscounted] = useState(false);
    const [vegeType, setVegeType] = useState(params.type.toUpperCase());
    const [mobView, setMobView] = useState(false);
    const [isNav, setIsNav] = useState(false);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [open, setOpen] = useState(false)

    //tour try
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);


    const steps = [
        {
            title: 'Upload File',
            description: 'Put your files here.',
            cover: (
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: animatedGirl
                    }}
                    height={200}
                    width={200}
                />
            ),
            arrow: true,
            target: () => ref1.current,
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref2.current,
            cover: (
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: thinkingGirl
                    }}
                    height={200}
                    width={200}
                />
            ),
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => ref3.current,
            cover: (
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: animatedGirl
                    }}
                    height={200}
                    width={200}
                />
            ),
        }, {
            title: 'Row Packages',
            description: 'Packaging is essential to preserve the freshness of fruits and vegetables and their flavour and nutritional value. Packaging slows down the decay process and preserves the freshness of the products by keeping them in moisture-free environments. They ensure that the products remain in a hygienic environment during transportation, storage and sale. In this way, they prevent the contamination of germs and bacteria by exposing the products to environmental factors. Packaging provides easy transportation and storage of products. This prevents products from being damaged and spoiled.',
            target: () => ref4.current,
            placement: 'bottom',
            cover: (
                <div style={{marginTop: '3rem'}}><Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: thinkingGirl
                    }}
                    height={150}
                    width={150}
                />
                </div>),
        }, {
            title: 'Cutting Packages',
            description: 'Packaging is essential to preserve the freshness of fruits and vegetables and their flavour and nutritional value. Packaging slows down the decay process and preserves the freshness of the products by keeping them in moisture-free environments. They ensure that the products remain in a hygienic environment during transportation, storage and sale. In this way, they prevent the contamination of germs and bacteria by exposing the products to environmental factors. Packaging provides easy transportation and storage of products. This prevents products from being damaged and spoiled.',
            target: () => ref5.current,
            placement: 'bottom',
            cover: (
                <div style={{marginTop: '3rem'}}><Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: animatedGirl
                    }}
                    height={150}
                    width={150}
                />
                </div>),
        },
    ];

    let timer;

    useEffect(() => {

        if (window !== undefined && window.innerWidth < 769) {
            setIsNav(true)
            setMobView(true)

        }

    }, []);

    const showDrawer = () => {
        setIsNav(true);
    };
    const onClose = () => {
        setIsNav(false);
    };


    const clearFilterDetails = () => {
        setSearchProd('')
        setPriceRange([0, 15000])
        setCategories([]);
        setSelectedCategory([]);
        getAllCategoriesDetails()
        loadStoreDetails(currentPage, searchProd, isDiscounted, [], priceRange, vegeType)
        document.querySelectorAll('.ant-checkbox-input').forEach(checkbox => {
            checkbox.checked = false;
        });
    };


    useEffect(() => {
        let help = localStorage.getItem('help')
        setTourStatus(!help)
        setOpen(true)
        getAllCategoriesDetails();
        loadStoreDetails(1, '', false, [], [0, 150000000], params.type.toUpperCase());
    }, []);


    useEffect(() => {
    }, [familyPackCardData]);

    const getAllCategoriesDetails = () => {
        //dispatch(setLoading(true));
        let temp = []
        categoriesService.categoriesGetAll(true).then(async res => {
            res.data?.records.map((cate) => {
                temp.push({
                    label: `${cate.name}`, value: cate.id,
                },)
            })
            await setCategories(temp)
        }).catch(c => {
            customToastMsg(c.message, 0)
        })
    }


    const getPriceRange = async (e) => {
        console.log(e)
        clearTimeout(timer);
        await setPriceRange(e)

        timer = setTimeout(async () => {
            await commonFilterDetails(currentPage, searchProd, isDiscounted, selectedCategory, e, vegeType)

        }, 800);

    };


    const commonFilterDetails = (currentPage, searchValue, isDiscounted, selCategory, price, vegeType) => {
        loadStoreDetails(currentPage, searchValue, isDiscounted, selCategory, price, vegeType)
    }

    const handleInputChange = async (e) => {
        clearTimeout(timer);
        await setSearchProd(e.target.value)
        timer = setTimeout(async () => {
            await commonFilterDetails(1, e.target.value, isDiscounted, selectedCategory, priceRange, vegeType)

        }, 800);
    };

    //temp implementation
    const loadStoreDetails = (currentPage, value, isDiscounted, categories, price, vegeType) => {
        setIsLoading(true);
        dispatch(setLoading(true));
        setFamilyPackCardData([])
        let search = {
            "page": currentPage,
            "limit": 20,
            "filters": {
                "name": value === undefined ? '' : value,
                "minPrice": 0,
                "maxPrice": 1000,
                "isDiscount": isDiscounted,
                "categories": categories.length === 0 ? null : categories,
                "rawOrCut": vegeType,
                "onlyThirdLayerCategory": true
            }
        }

        categoriesService.subCategoriesGetAll(search).then(res => {
            let temp = []
            setFamilyPackCardData([])
            res.data?.records.map((pack) => {
                let defaultImageview = pack.files.find(file => file?.isDefault)?.imageSizes?.original;
                let discountedPrice = pack.price - ((pack.price / 100) * pack?.discount)
                temp.push({
                    id: pack.id,
                    title: pack.name,
                    tag: pack?.parent?.tag,
                    category: pack.parent.name,
                    categoryColor: `#${pack.parent.color}`,
                    minPrice: formatPrice(pack.minPrice),
                    isDiscountedPackage: pack.discount > 0,
                    discountedPrice: discountedPrice,
                    imageUrl: defaultImageview === undefined ? defaultImage : defaultImageview,
                    data: pack
                })
            })

            setCurrentPage(res.data.currentPage)
            setTotalRecords(res.data.totalRecords)
            setHasNextPage(res.data.hasNextPage)
            vegeType === 'RAW' ? setFamilyPackCardData(temp) : setFamilyPackCardDataCut(temp)
            setIsLoading(false);
            temp = []
            dispatch(setLoading(false));
        }).catch(c => {
            dispatch(setLoading(false));
            customToastMsg(c.message, 0)

        })
    }


    //Pagination
    const onChangePagination = async (page) => {

        await setCurrentPage(page);
        loadStoreDetails(page, searchProd, isDiscounted, selectedCategory, priceRange, vegeType)
    };


    const haveDiscount = (e) => {
        setIsDiscounted(e.target.checked)
        loadStoreDetails(currentPage, searchProd, e.target.checked, selectedCategory, priceRange, vegeType);
    };

    const onChangeCategory = async (e) => {
        clearTimeout(timer);
        let temp = selectedCategory;

        temp.push(e)
        await setSelectedCategory(e);
        timer = setTimeout(async () => {
            console.log(e)
            await commonFilterDetails(1, searchProd, isDiscounted, e, priceRange, vegeType)
        }, 800);
    };


    return <CommonLayout>

        <div className={poppins.className}>
            <Row className="filterShore">
                <Drawer
                    title={" "}
                    placement={'left'}
                    closable={true}
                    onClose={onClose}
                    open={isNav}
                    key={'left'}
                >
                    <div className='px-3 filter-wrapper'>
                        <div>
                            <CardBody>
                                <span
                                    className='d-flex justify-content-between  align-items-center mb-1'>
                                <h3>Filters <Sliders size={16}/></h3> <small className='cursor text-secondary'
                                                                             onClick={() => {
                                                                                 setCategories([])
                                                                                 clearFilterDetails()
                                                                             }}>Clear All</small>
                            </span>

                                <hr/>

                                <div ref={!mobView ? null : ref1} className={` ${poppins.className}filter-methods`}>
                                    <h2 className="border-bottom pb-2 filter-title"> Package Name</h2>
                                    <div className="custom-control custom-checkbox mb-3">

                                        <Input value={searchProd} onChange={(e) => handleInputChange(e)} size={"large"}
                                               placeholder={'Search your package'}/>

                                    </div>
                                </div>

                                <div ref={!mobView ? null : ref2} className='filter-methods'>
                                    <h2 className="border-bottom pb-2 filter-title"> Categories</h2>
                                    <div className="custom-control custom-checkbox mb-3">

                                        {categories.length === 0 ? <Skeleton active/> :
                                            <Checkbox.Group className={"d-flex flex-column"}
                                                            onChange={onChangeCategory}>
                                                {categories.map(category => (
                                                    <Checkbox className='my-2' key={category.value}
                                                              value={category.value}>
                                                        {category.label}
                                                    </Checkbox>))}
                                            </Checkbox.Group>}

                                    </div>
                                </div>

                                <div ref={!mobView ? null : ref3} className='filter-methods'>
                                    <h2 className="border-bottom pb-2 filter-title"> Package Discount</h2>
                                    <div className="custom-control custom-checkbox mb-3">

                                        <Checkbox onChange={haveDiscount}>Have Discount</Checkbox>
                                    </div>
                                </div>


                                <div className='filter-methods'>
                                    <h2 className="border-bottom pb-2 filter-title"> Product Price (LKR)</h2>
                                    <div className="custom-control custom-checkbox mb-3">

                                        <Row className='d-flex justify-content-between'>
                                            <Col sm={10} md={11} lg={11}>
                                                <Input type='number' value={min} onChange={(e) => {
                                                    setMin(e.target.value)
                                                }} clasaName='w-100' placeholder="Min"/>
                                            </Col>
                                            <Col
                                                className='d-flex justify-content-center align-items-center text-center'
                                                sm={1} md={1}
                                                lg={1}>
                                                <span className='text-secondary'>-</span>
                                            </Col> <Col sm={11} md={10} lg={11}>
                                            <Input type='number' value={max} onChange={(e) => {
                                                setMax(e.target.value)
                                            }} clasaName='w-100' placeholder="Max"/>
                                        </Col>

                                            <Col sm={24} md={24} lg={24}>
                                                <Button onClick={() => {
                                                    getPriceRange([parseFloat(min), parseFloat(max)]);
                                                }} className='filter-apply-btn mt-2 w-100'>
                                                    Apply
                                                </Button>
                                            </Col>
                                        </Row>


                                    </div>
                                </div>


                            </CardBody>
                        </div>
                    </div>
                </Drawer>
                <Col md={6} lg={8} xl={5} className=' px-3 filter-wrapper'>

                    <Card>
                        <CardBody>
                            <span
                                className='d-flex justify-content-between  align-items-center mb-1'>
                                <h3>Filters <Sliders size={16}/></h3> <small className='cursor' onClick={() => {
                                clearFilterDetails()
                            }}>Clear All</small>
                            </span>


                            <hr/>

                            <div ref={mobView ? null : ref1}
                                 className={` ${poppins.className}filter-methods`}>
                                <h2 className="border-bottom pb-2 filter-title"> Package Name</h2>
                                <div className="custom-control custom-checkbox mb-3">

                                    <Input value={searchProd} onChange={(e) => handleInputChange(e)} size={"large"}
                                           placeholder={'Search your package'}/>

                                </div>
                            </div>

                            <div ref={mobView ? null : ref2} className='filter-methods'>
                                <h2 className="border-bottom pb-2 filter-title"> Categories</h2>
                                <div className="custom-control custom-checkbox mb-3">

                                    <Checkbox.Group className={"d-flex flex-column"}
                                                    onChange={onChangeCategory}>
                                        {categories.map(category => (
                                            <Checkbox className='my-2' key={category.value} value={category.value}>
                                                {category.label}
                                            </Checkbox>))}
                                    </Checkbox.Group>

                                </div>
                            </div>

                            <div ref={mobView ? null : ref3} className='filter-methods'>
                                <h2 className="border-bottom pb-2 filter-title"> Package Discount</h2>
                                <div className="custom-control custom-checkbox mb-3">

                                    <Checkbox onChange={haveDiscount}>Have Discount</Checkbox>
                                </div>
                            </div>


                            <div className='filter-methods'>
                                <h2 className="border-bottom pb-2 filter-title"> Product Price (LKR)</h2>
                                <div className="custom-control custom-checkbox mb-3">

                                    <Row className='d-flex justify-content-between'>
                                        <Col sm={10} md={11} lg={11}>
                                            <Input type='number' value={min} onChange={(e) => {
                                                setMin(e.target.value)
                                            }} clasaName='w-100' placeholder="Min"/>
                                        </Col>
                                        <Col className='d-flex justify-content-center align-items-center text-center'
                                             sm={1} md={1}
                                             lg={1}>
                                            <span className='text-secondary'>-</span>
                                        </Col> <Col sm={11} md={10} lg={11}>
                                        <Input type='number' value={max} onChange={(e) => {
                                            setMax(e.target.value)
                                        }} clasaName='w-100' placeholder="Max"/>
                                    </Col>

                                        <Col sm={24} md={24} lg={24}>
                                            <Button onClick={() => {
                                                getPriceRange([parseFloat(min), parseFloat(max)]);
                                            }} className='filter-apply-btn mt-2 w-100'>
                                                Apply
                                            </Button>
                                        </Col>
                                    </Row>


                                </div>
                            </div>


                        </CardBody>
                    </Card>

                </Col>

                <Col sm={24} md={24} lg={16} xl={19} className=' left-border px-3'>

                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#00b96b',
                                borderRadius: 2,
                            },
                        }}
                    > <Tabs
                        defaultActiveKey={vegeType === 'RAW' ? '1' : '2'}
                        onChange={(e) => {
                            //clearFilterDetails();
                            setVegeType(e === 2 ? 'CUT' : 'RAW')
                            setFamilyPackCardData(null);
                            router.push(`/package-store/${e === '2' ? 'cut' : 'raw'}`)
                        }
                        }
                        inkBarColor={'#ffff00'}
                        itemActiveColor={'#e5e5e5'}
                        items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
                            const id = String(i + 1);

                            const childrenDetails = [{
                                component: <>
                                    <Row>
                                        <Col md={24} lg={24} xl={24}
                                             className='px-sm-0 px-md-4 px-lg-4  d-flex justify-content-between'>
                                            <Breadcrumb
                                                items={[{
                                                    title: 'Home',
                                                }, {
                                                    title: 'Package Store',
                                                }

                                                ]}
                                            />
                                            <span>
                                Showing 1-20 of {familyPackCardData?.length} Products
                            </span>
                                        </Col>
                                    </Row>
                                    <Row className='filter-btn'>
                                        <Col md={24} lg={24} xl={24}
                                             className='px-sm-0 px-md-4 px-lg-4 mt-3 d-flex justify-content-start'>
                                            <Button onClick={showDrawer}>
                                                <span className='mx-2'> Filters</span> <Sliders size={14}/>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row
                                        className={`d-flex  justify-content-start  `}>

                                        {!isLoading && familyPackCardData?.map((card, index) => (
                                            <Col className='w-100' xsm={24} sm={24} md={8} lg={6} xl={6} xxl={4}>
                                                <CategoryCard
                                                    key={index}
                                                    data={card}
                                                    vegetableType={vegeType}
                                                    direction={true}
                                                />
                                            </Col>))}
                                        {hasNextPage &&
                                            <Col className='d-flex justify-content-end' sm={24} md={24} lg={24} xl={24}>
                                                <Pagination
                                                    current={currentPage} onChange={onChangePagination}
                                                    total={totalRecords}/>
                                            </Col>}
                                    </Row>
                                </>,
                                name: <span ref={mobView ? null : ref4}>Raw Packages</span>,
                                icon: <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em"
                                           viewBox="0 0 128 128">
                                    <path fill="#ed6c31"
                                          d="M55.46 70.67L4.01 110.71s-1.71 2.41-.27 4.5c1.45 2.09 6.33 1.55 14.21-1.99c7.14-3.21 25.54-12.74 34.49-18.7c6.57-4.38 16.59-10.13 22.77-15.92c2.86-2.67 4.47-4.72 5.39-7.91c2.82-9.79-2.47-13.85-2.47-13.85z"/>
                                    <path fill="#ff8d02"
                                          d="M7.09 112.46c5.65-.99 20.94-10.66 28.73-15.13s34.9-20.88 38.54-27.43c2.03-3.66 3.01-10.39-.1-14.65s-9.03-7.58-17.14-3.64c-7.48 3.64-22.23 23.28-29.61 31.48C17.5 94.22 8.59 104.68 4.98 109.23c-1.23 1.54-1.4 2.34-1.4 2.34s1.33 1.28 3.51.89"/>
                                    <path fill="#2f7c31"
                                          d="M80.8 42.38c-.26 1.76-2.01 3.37-5.09 6.13c-4.05 3.64-5.71 3.43-6.44 5.3c-.45 1.17.47 3.67 2.91 6.34c2.18 2.39 4.17 3.16 4.99 3.01c1.99-.35 3.12-3.01 7.27-6.44c3.08-2.54 4.16-3.43 5.71-3.32c1.56.1 2.89 1.57 4.57 3.32c2.49 2.6 7.36 4.94 12.41 3.25c6.01-2.02 6.25-7.6 6.87-8.22c.62-.62 5.23-.53 7.62-3.34c2.39-2.8 3.08-9.59 2.04-11.46c-1.04-1.87-49.1-15.24-49.1-15.24s-2.04 5.89-.52 10.18c2.4 6.75 7.24 7.2 6.76 10.49"/>
                                    <path fill="#ffa726"
                                          d="M47.04 68.35c2.14 1.94 4.36.42 5.82-1.04c1.31-1.31 4.36-4.26 5.71-5.19c1.35-.93 4.05-3.01 5.82-4.36c1.77-1.35 1.57-5.88-2.39-5.19c-2.39.42-5.09 2.6-8.1 5.09c-2.38 1.97-5.19 4.99-6.34 6.54c-1.14 1.55-1.66 3.11-.52 4.15m-9.07 9.89c-1.47-1.47-2.88-.47-4.88 1.71s-2.24 3.69-1.06 4.82c1.65 1.59 3.41-.41 4.82-2c1.41-1.59 2.77-2.88 1.12-4.53"/>
                                    <path fill="#ed6c31"
                                          d="M59.45 63.7c-1.07.94-.99 2.57.25 3.97c1.51 1.7 2.96 3.15 4.23 4.23c1.26 1.07 2.9.57 3.47-.19c.78-1.04.63-2.4-.5-3.6c-.96-1.01-3.09-3.41-4.35-4.35c-.83-.61-2.09-.94-3.1-.06m-17.79 8.02c-1.55 1.35-.69 3.47.44 5.11c1.14 1.64 2.96 3.78 5.05 2.52s.25-4.73-.69-6.12c-.95-1.39-2.85-3.22-4.8-1.51M32.1 88.79c-1.39 1.52-.37 3.27 1.26 4.48c1.7 1.26 3.85 2.02 4.92.63c1.07-1.39-.32-3.41-1.64-4.35c-1.32-.95-3.21-2.21-4.54-.76M14.85 99.53c-1.67 1.27-.5 3.66.32 4.67s2.33 2.4 3.78 1.14c1.41-1.23.6-3.13-.19-4.48c-1.07-1.83-2.84-2.15-3.91-1.33"/>
                                    <path fill="#709921"
                                          d="M88.39 16.25c.76-.13 8.16-8.86 19.38-2.95c10.83 5.7 5.93 14.89 6.33 15.47s5.17.4 7.83 4.39c2.85 4.28 2 6.65 2 6.65s-1.03 4-5.84 4.95c-3.04.6-6.42-.77-7.37-.29s-.72 4.91-6.23 6.62c-3.5 1.09-10.55-.35-15.15-4.72c-4.67-4.43-3.08-9.11-5.95-11.37c-3.99-3.14-12.21-7.58-8.24-14.69c4.56-8.17 12.49-3.93 13.24-4.06"/>
                                </svg>
                            },
                                {
                                    component: <>
                                        <Row>
                                            <Col md={24} lg={24} xl={24}
                                                 className='px-4 d-flex justify-content-between'>
                                                <Breadcrumb
                                                    items={[{
                                                        title: 'Home',
                                                    }, {
                                                        title: 'Package Store',
                                                    }

                                                    ]}
                                                />
                                                <span>
                                Showing 1-20 of {familyPackCardDataCut?.length} Products
                            </span>
                                            </Col>
                                        </Row>
                                        <Row className='filter-btn'>
                                            <Col md={24} lg={24} xl={24}
                                                 className='px-4 mt-3 d-flex justify-content-start'>
                                                <Button onClick={showDrawer}>
                                                    <span className='mx-2'> Filters</span> <Sliders size={14}/>
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row
                                            className={`d-flex justify-content-start `}>

                                            {!isLoading && familyPackCardDataCut.map((card, index) => (
                                                <Col className='w-100' xsm={24} sm={24} md={8} lg={6} xl={6} xxl={4}>
                                                    <CategoryCard
                                                        key={index}
                                                        data={card}
                                                        vegetableType={vegeType}
                                                        direction={true}
                                                    />
                                                </Col>))}
                                            {hasNextPage &&
                                                <Col className='d-flex justify-content-end' sm={24} md={24} lg={24}
                                                     xl={24}>
                                                    <Pagination
                                                        current={currentPage} onChange={onChangePagination}
                                                        total={totalRecords}/>
                                                </Col>}
                                        </Row>
                                    </>,
                                    name: <span ref={mobView ? null : ref5}>Cutting Packages</span>,
                                    icon: <svg className={'knife-icon'} xmlns="http://www.w3.org/2000/svg" width="1.5em"
                                               height="1.5em"
                                               viewBox="0 0 36 36">
                                        <path fill="#ccd6dd"
                                              d="M35.875 34.604L19.796 15.113s-5.637 3.692-7.689 9.676c0 0 4.667 5.292 9.79 8.225c6.368 3.646 11.642 2.855 13.703 2.391a.496.496 0 0 0 .275-.801"/>
                                        <path fill="#aab8c2"
                                              d="m18.071 13.005l-4.035 3.559c.066.028.316.45.174 1.107c-.402 1.865-2.346 4.288-2.974 5.098c-.194.25-.224.691.026 1.007l.845 1.013c1.821-3.964 6.556-8.694 7.689-9.676z"/>
                                        <path fill="#31373d"
                                              d="M18.071 13.005s-3.32-4.216-5.763-6.986S8.208 1.658 6.625.64C5.01-.398 3.285.205 1.981 1.354S-.722 5.082.787 6.793c.826.937 2.785.078 3.791 1.219c.683.774 1.031 1.365 3.464 3.859c3.759 3.854 5.994 4.692 5.994 4.692s1.251-1.042 1.932-1.648a222.19 222.19 0 0 0 2.103-1.91"/>
                                        <circle cx="11.618" cy="10.543" r="1.365" fill="#f5f8fa"/>
                                        <circle cx="5.903" cy="4.653" r="1.365" fill="#f5f8fa"/>
                                    </svg>
                                }]
                            return {
                                key: id,
                                label: childrenDetails[i].name,
                                children: childrenDetails[i].component,
                                icon: childrenDetails[i].icon,
                            };
                        })}
                    />
                    </ConfigProvider>

                </Col>
            </Row>
        </div>
    </CommonLayout>
}

export default Page