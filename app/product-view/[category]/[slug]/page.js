"use client"
import {useEffect, useState} from "react";
import CommonLayout from "@/app/layouts/commonLayout";
import {poppins} from "@/app/fonts";
import '../../../../styles/singlePackageView.scss'
import {Carousel, Col, Row} from "antd";
import {Container} from "reactstrap";
import {useDispatch} from "react-redux";
import {setLoading} from "@/redux/actions/loadingActions";
import {customToastMsg} from "@/util/CommonFun";
import * as categoryService from "@/service/categoriesService";
import FamilyPackCard from "@/components/cards/FamilyPackCard";
import {useRouter} from 'next/router';

const page = ({params}) => {
    const dispatch = useDispatch();
    const [prodData, setProdDate] = useState({})
    const [packages, setPackages] = useState([])
    const [prodImage, setProdImage] = useState('')

    useEffect(() => {
        getProdDetailsBySlug();
        console.log(params.category)
    }, []);

    const getProdDetailsBySlug = async () => {
        dispatch(setLoading(true));
        let packDetails = []
        await categoryService.getCategoryBySlugDetails(params.slug, params.category).then(async res => {
            let temp = {
                ...res.data,
                imagePath: res?.data?.files[0]?.file?.path
            }

            let img = ''
            res?.data?.files?.map((file, index) => {
                if (file.isDefault) {
                    img = file.isDefault && file.path
                }
            })
            setProdImage(img)
            console.log(img)

            res.data.package.map((pack, index) => {
                let discountedPrice = pack.price - ((pack.price / 100) * pack.discount)
                console.log(pack.files)
                packDetails.push({
                    id: pack.id,
                    title: `${pack.name} `,
                    // title: `${pack.name} (${pack.person_count} Person)`,
                    category: pack.title,
                    price: pack.price,
                    isDiscountedPackage: pack.discount > 0,
                    imageUrl: pack.files[0]?.imageSizes?.medium,
                    discountedPrice: discountedPrice,
                    data: pack,
                    slug: pack.slug
                })
            })

            setPackages(packDetails)
            setProdDate(temp)
        }).catch(c => {
            customToastMsg(c.message, 0)
        }).finally(f => {
            dispatch(setLoading(false));
        })
    }
    
    return <CommonLayout>
        {prodData?.name && <div className={`singlePackage ${poppins.className}`}>
            <Row className='w-100 bg-name' style={{
                backgroundImage: `url(${prodImage})`
            }}>
                <Col className='path-data'><Container>
                    <small className="">{prodData?.hierarchy}</small>
                </Container></Col>
                <Col md={24}>
                    <h1 className="d-flex text-white justify-content-center">
                        <span>{prodData?.name}</span>

                    </h1>
                </Col>
            </Row>

            {<Container>

                {prodData.description && <Row className='W-100'>
                    <Col className="product-details-wrapper" md={24} lg={24}>


                        <span className='sub-topic'>About</span>
                        <div dangerouslySetInnerHTML={{__html: prodData.description}}/>

                    </Col>


                </Row>}

                {packages.length > 0 && <Row className='w-100 package-size-wrapper'>
                    <Col sm={24} md={24} lg={24} className='mt-3'>
                        <span className='sub-topic'>Package Sizes</span> <br/>

                    </Col>
                    {window.innerWidth > 426 ? <Row className={`mt-4 w-100 d-flex  justify-content-start `}>
                        {packages?.map((card, index) => (
                            <Col sm={24} md={6} lg={5} xl={5} key={index} className="family_pack_carousel_col">
                                <FamilyPackCard
                                    packType={params.category}
                                    data={card}
                                />
                            </Col>
                        ))}

                    </Row> : <Row className='mt-0 w-100 d-flex  justify-content-start '>
                        <Carousel dotPosition='bottom' style={{width: '90vw'}} arrows infinite={false}>
                            {packages?.map((card, index) => (
                                <Col sm={24} md={6} lg={5} xl={5} key={index} className="family_pack_carousel_col">
                                    <FamilyPackCard
                                        packType={params.category}
                                        data={card}
                                    />
                                </Col>
                            ))}
                        </Carousel>
                    </Row>}


                </Row>}

            </Container>
            }

        </div>}
    </CommonLayout>


}

export default page;