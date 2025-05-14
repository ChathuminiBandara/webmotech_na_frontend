"use client"
import {Modal} from "antd";
import GoogleMapView from "../../components/googleMap/GoogleMap";
import {useEffect} from "react";

const LocationCheck = ({isOpen, outletId, toggleModal, cityDetails, radius}) => {
    useEffect(() => {
        console.log('recall')

    }, [toggleModal]);
    return <Modal
        style={{
            top: 20,
        }}
        title="Check Your distance requirements"
        open={isOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={null}
        maskClosable={false}
        width={650}>
        <GoogleMapView radius={radius} outletDetails={outletId} cityDetails={cityDetails}
                       close={(data) => toggleModal(data)}/>
    </Modal>

}
export default LocationCheck