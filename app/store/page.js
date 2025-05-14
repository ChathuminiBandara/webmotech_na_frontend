"use client"
import CommonLayout from "../../app/layouts/commonLayout";
import { Breadcrumb, Button, Col, Input, Pagination, Row, Radio, Slider} from "antd";
import {Card, CardBody} from "reactstrap";
import React, {useEffect, useState} from "react";
import '../../styles/storeView.scss'
import {Sliders} from 'react-feather'

import * as categoriesService from "../../service/categoriesService";
import {poppins} from "../../app/fonts";

import * as packageService from "../../service/packageService";

import UnitProduct from "../../components/cards/UnitProduct";
import {LITERS, PORTION, QTY, WEIGHT} from "../../util/constants";

import {useDispatch} from "react-redux";
import {setLoading} from "../../redux/actions/loadingActions";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()

    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState(null);
    const [familyPackCardData, setFamilyPackCardData] = useState([]);
    const [searchProd, setSearchProd] = useState('');
    const [categories, setCategories] = useState([]);
    const [productType, setProductType] = useState('PACKAGES');
    const [selectedProdType, setSelectedProductType] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 15000]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [current, setCurrent] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    let timer;


    const clearFilterDetails = () => {
        setSearchProd('')
        setSelectedProductType([])
        setPriceRange([0, 15000])
        setSelectedCategory('');
        setCurrent(1);
        commonFilterDetails()
        document.querySelectorAll('.ant-checkbox-input').forEach(checkbox => {
            checkbox.checked = false;
        });
    };


    useEffect(() => {
        getAllCategoriesDetails();
        loadStoreDetails(1);
    }, []);

    const getAllCategoriesDetails = () => {
        dispatch(setLoading(true));
        let temp = []
        categoriesService.categoriesGetAll().then(async res => {
            res.data.map((cate, index) => {
                temp.push(
                    {
                        label: cate.name,
                        value: cate.id,
                    },
                )
            })
            await setCategories(temp)
            dispatch(setLoading(false));
        })
    }
    const onChangeCategory = async (e) => {
        clearTimeout(timer);
        await setSelectedCategory(e.target.value); // Set the selected category
        timer = setTimeout(async () => {
            await commonFilterDetails(1, searchProd, e.target.value, priceRange)
        }, 800);
    };


    const getPriceRange = async (e) => {
        clearTimeout(timer);
        await setPriceRange(e)
        timer = setTimeout(async () => {
            await commonFilterDetails(1, searchProd, selectedCategory, e)

        }, 800);

    };


    const commonFilterDetails = (currentPage, searchValue, categories, priceRange) => {
        console.log(priceRange)
        loadStoreDetails(currentPage, searchValue, categories, priceRange)

    }

    const handleInputChange = async (e) => {
        clearTimeout(timer);
        await setSearchProd(e.target.value)
        timer = setTimeout(async () => {
            await commonFilterDetails(1, e.target.value, selectedCategory, priceRange, 1)

        }, 800);
    };

    //temp implementation
    const loadStoreDetails = (currentPage, value, category, price) => {
        setIsLoading(true);
        let search = {
            page: currentPage,
            search: value === undefined ? '' : value,
            category: category ? category : '',
            price: price ? price : ['', '']
        }
        console.log(search)
        packageService.getAllProductToStore(search).then(res => {
            let temp = []
            res.data.map((pack, index) => {

                let prodPrice = 0
                if (pack.unitType === WEIGHT || pack.unitType === LITERS) {
                    prodPrice = (pack?.fromPrice / 1000) * 100
                } else {
                    prodPrice = pack.fromPrice
                }

                temp.push({
                    id: pack.id,
                    title: `${pack.name}`,
                    category: pack.title,
                    price: prodPrice,
                    unitTypeSymbols: pack.unitType === WEIGHT ? 'g' : pack.unitType === LITERS ?
                        'ml' : pack.unitType === QTY ? 'qty' : pack.unitType === PORTION ?
                            'portion' : '',
                    unitTypeQty: pack.unitType === WEIGHT ? '100' : pack.unitType === LITERS ?
                        '100' : pack.unitType === QTY ? '1' : pack.unitType === PORTION ?
                            '1' : '',
                    fromPrice: pack.fromPrice,
                    imageUrl: pack.files[0].file.path,
                    data: pack
                })
            })
            console.log(res)
            setCurrentPage(res.currentPage)
            setTotalRecords(res.totalRecords)
            setFamilyPackCardData(temp)
            setIsLoading(false);
        })
    }


    //Pagination
    const onChangePagination = async (page) => {
        console.log(page);
        await setCurrentPage(page);
        loadStoreDetails(page, searchProd, selectedCategory, priceRange)
    };


    const typeCheck = (page) => {
        console.log(page);
        setProductType(page);
    };


    return <CommonLayout>

        <div className={poppins.className}>
            <Row className="filterShore">
                <Col md={6} lg={8} xl={5} className='px-3'>

                    <Card>
                        <CardBody>
                            <span
                                className='d-flex justify-content-between mb-1'>
                                <h3>Filters <Sliders size={16}/></h3> <small className='cursor' onClick={() => {
                                clearFilterDetails()
                            }}>Clear All</small>
                            </span>


                            <hr/>

                            <div className='filter-methods'>
                                <h2 className="border-bottom pb-2 filter-title"> Product Name</h2>
                                <div className="custom-control custom-checkbox mb-3">

                                    <Input value={searchProd} onChange={(e) => handleInputChange(e)} size={"large"}
                                           placeholder={'Search your product'}/>

                                </div>
                            </div>


                            <div className='filter-methods'>
                                <h2 className="border-bottom pb-2 filter-title"> Categories</h2>
                                <div className="custom-control custom-checkbox mb-3">

                                    <Radio.Group className={"d-flex flex-column"} value={selectedCategory}
                                                 onChange={onChangeCategory}>
                                        {categories.map(category => (
                                            <Radio className='my-2' key={category.value} value={category.value}>
                                                {category.label}
                                            </Radio>
                                        ))}
                                    </Radio.Group>

                                </div>
                            </div>

                            <div className='filter-methods'>
                                <h2 className="border-bottom pb-2 filter-title"> Product Price (LKR)</h2>
                                <div className="custom-control custom-checkbox mb-3">
                                    <div className="d-flex justify-content-between">
                                        <span>{parseFloat(priceRange[0]).toFixed(2)}</span>
                                        <span>{parseFloat(priceRange[1]).toFixed(2)}</span>
                                    </div>
                                    <Slider
                                        styles={{
                                            track: {
                                                background: 'transparent',
                                            },
                                            tracks: {
                                                background: '#5cb919',
                                            },
                                        }}
                                        max={15000} value={priceRange} range onChange={getPriceRange}/>

                                </div>
                            </div>


                        </CardBody>
                    </Card>

                </Col>
                {/*store view*/}
                <Col md={18} lg={16} xl={19} className='left-border px-3'>
                    <Row>
                        <Col md={24} lg={24} xl={24} className='px-4 d-flex justify-content-between'>
                            <Breadcrumb
                                items={[
                                    {
                                        title: 'Home',
                                    }, {
                                        title: 'Store',
                                    }

                                ]}
                            />
                            <span>
                                Showing 1-10 of 100 Products
                            </span>
                        </Col>
                    </Row>
                    <Row className='d-flex justify-content-evenly'>
                        {!isLoading &&
                            familyPackCardData.map((card, index) => (

                                <UnitProduct
                                    key={index}
                                    data={card}
                                    direction={true}
                                />

                            ))
                        }

                        <Col className='d-flex justify-content-end' sm={24} md={24} lg={24} xl={24}>
                            <Pagination
                                current={currentPage} onChange={onChangePagination} total={totalRecords}/>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    </CommonLayout>
}

export default Page