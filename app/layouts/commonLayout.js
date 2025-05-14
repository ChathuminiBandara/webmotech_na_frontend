"use client"
import NavBar from "../../components/NavBar";
import React, {useEffect, useState} from "react";
import Footer from "../../components/Footer";
import {FloatButton, Tooltip} from "antd";
import {CommentOutlined, CustomerServiceOutlined, InfoCircleOutlined, PhoneOutlined} from "@ant-design/icons";


const CommonLayout = ({children}) => {

    const [tourStatus, setTourStatus] = useState(false)
    useEffect(() => {
        let help = localStorage.getItem('help')
        setTourStatus(help)
    }, []);


    return <>
        <NavBar/>
        <main style={{minHeight: '90vh'}}>{children}</main>
        <Footer/>
    </>
}

export default CommonLayout;