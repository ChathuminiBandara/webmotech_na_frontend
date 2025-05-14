import React, {useState} from "react";
import "../../styles/unitPackage.scss";
import Image from "next/image";
import {Col, Row, Button} from "antd";
import {FiShoppingCart} from "react-icons/fi";
import {poppins} from "../../app/fonts";
import {ShoppingCart} from 'react-feather'
import ContactUs from '../modals/ContactUs'
import LocationCheck from "../../components/modals/LocationCheck";
import {ChevronsUp} from 'react-feather'

const UnitProduct = ({data}) => {
    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false)
    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`${poppins.className} unit_pack_store`}>
            <LocationCheck prodData={data} isOpen={isOpen} toggleModal={toggleModal}/>
            <div className={"family_pack_store_card"}>
                <Image
                    alt="d"
                    src={data.imageUrl}
                    width={200}
                    height={100}
                    className="unit_pack_img"
                />
                <div className="family_pack_des_div">
                    <h5>{data.category}</h5>
                    <h4>{data.title}</h4>
                    <div className="family_pack_btn_div">
                        <div className="d-flex flex-column w-100">
                            <small className='text-secondary'>From <ChevronsUp color={'#60B24CFF'} size={12}/></small>
                            <span
                                className='price'> LKR{parseFloat(data.price === undefined ? 10 : data.price).toFixed(2)}  </span>
                            <small className='unit-amount'>{data.unitTypeQty + ' ' + data.unitTypeSymbols}</small>
                        </div>

                        <Button type="button" className="family_pack_card_btn" onClick={toggleModal}>
                            <ShoppingCart size={16} style={{margin: "0 10px 0 0"}}/> Add
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitProduct;
