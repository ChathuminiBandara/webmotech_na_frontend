import React, {useEffect, useState} from "react";
import "../../styles/FamilyPackCard.scss";
import Image from "next/image";
import {Col, Badge, Button} from "antd";
import {FiShoppingCart} from "react-icons/fi";
import {quicksand} from "../../app/fonts";
import {ShoppingCart} from 'react-feather'
import ContactUs from '../modals/ContactUs'
import LocationCheck from "../../components/modals/LocationCheck";
import Cookies from "js-cookie";
import AddToCard from "../../components/modals/AddToCard";
import {PACKAGE_DIRECTION} from "../../util/constants";
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import discountStar from "../../public/assets/discount_start.png"
import {useDispatch} from "react-redux";
import {setLoading} from "@/redux/actions/loadingActions";
import {formatPrice} from "@/util/CommonFun";

const FamilyPackCard = ({data, packType}) => {
    const dispatch = useDispatch();

    let router = null;

    if (typeof window === 'undefined') {
        return null;
    } else {
        router = useRouter()
    }

    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
    const toggleContactUsModal = () => {
        setIsContactUsModalOpen(!isContactUsModalOpen);
    };
    const [isOpen, setIsOpen] = useState(false)
    const [eligible, setEligible] = useState(false);

    useEffect(() => {

        setEligible(Cookies.get("Eligible"))
    }, [isOpen]);


    const toggleModal = (dir) => {
        console.log(dir, isOpen)
        if (dir === 'map' && isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(!isOpen)
        }

        if (dir) {
            openAgainModal(dir)
        }

    }

    const openAgainModal = (dir) => {
        setIsOpen(true)
        setEligible(true)
    }

    const openModal = (dir) => {

    }

    return (

        <div onClick={() => {
            dispatch(setLoading(true));
            router.push(`/package-details/${packType}/${data.data.slug}`)
            dispatch(setLoading(false));
        }} className={quicksand.className} id={"family_pack"}>
            {/*{isOpen &&*/}
            {/*    <div>     {!eligible ? <LocationCheck prodData={data} isOpen={isOpen} toggleModal={() => {*/}
            {/*            toggleModal('map')*/}
            {/*        }}/> :*/}
            {/*        <AddToCard direction={PACKAGE_DIRECTION} prodData={data} isOpen={isOpen} toggleModal={() => {*/}
            {/*            toggleModal()*/}
            {/*        }}/>}*/}
            {/*    </div>}*/}

            <div className={"family_pack_card"}>
                {data?.data?.discount > 0 && <div className="discount-badge-wrapper">
                    {data?.isDiscountedPackage && <h3 className={'discount-badge'}>{data?.data?.discount}% <span
                        style={{fontSize: 8, fontWeight: "normal"}}>OFF</span></h3>
                    }
                    <Image
                        alt="d"
                        src={discountStar}
                        width={90}
                        height={70}
                        className="discount_star_img"
                    />
                </div>}


                <Image
                    alt="d"
                    src={data?.imageUrl}
                    width={300}
                    height={100}
                    className="family_pack_img"
                />

                <div className="family_pack_des_div">
                    <h5 className='mt-1' onClick={() => openModal()}>{data?.category}</h5>
                    <h4 className='prod-title'>
                        <h4 style={{cursor: "pointer"}} onClick={() => {
                            router.push(`/package-details/${packType}/${data.data.slug}`)
                        }}>
                            {data?.title}
                        </h4>


                    </h4>
                    <div className="family_pack_btn_div">
                        {data?.isDiscountedPackage ?
                            // <div>
                            //     <small
                            //         className='text-danger text-decoration-line-through mb-2'>LKR {parseFloat(data?.price).toFixed(2)}</small>
                            //     <h4 className='mt-0'>LKR {parseFloat(data?.discountedPrice).toFixed(2)}</h4>
                            // </div> : <h4>{parseFloat(data?.price).toFixed(2)}</h4>}
                            <div className="">
                                <small
                                    className='text-danger text-decoration-line-through mb-2'>LKR {parseFloat(data?.price).toFixed(2)}</small>
                                <h4 className='mt-0'>LKR {parseFloat(data?.discountedPrice).toFixed(2)}</h4>
                            </div> : <h4>{formatPrice(parseFloat(data?.price).toFixed(2))}</h4>}
                    </div>
                    <Button type="button" className="family_pack_card_btn" onClick={() => {
                        dispatch(setLoading(true));
                        router.push(`/package-details/${packType}/${data.data.slug}`)

                    }}>
                        <ShoppingCart size={16} style={{margin: "0 10px 0 0"}}/> Add
                    </Button>
                </div>

            </div>

        </div>

    );
};

export default FamilyPackCard;
