"use client";

import React, {useEffect, useState} from "react";
import {Avatar, Badge, Button, Col, Menu, Popover, Row} from "antd";
import {Icon} from "@iconify/react";
import "../styles/NavBar.scss";
import {poppins} from "../app/fonts";
import ContactUs from "../components/modals/ContactUs";
import {useRouter} from 'next/navigation'
import Cookies from "js-cookie";
import * as constant from "../util/constants";
import {CART_LIST} from "../util/constants";
import {Power, ShoppingCart, User} from "react-feather";
import {useDispatch, useSelector} from 'react-redux';
import {logout, removeSlashes} from "@/util/CommonFun";
import {setLoading} from "@/redux/actions/loadingActions";
import Logo from '../public/assets/logo/updateFullLogo.png'
import Image from 'next/image'

const NavBar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const cartCountFromState = useSelector(state => state.cartAdding.updateCart);

    const [openNav, setOpenNav] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [profile, setProfile] = useState([]);
    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState("home");
    const [cartCount, setCartCount] = useState(0);
    const [windowSize, setWindowSize] = useState(0);


    useEffect(() => {
        let logged = Cookies.get(constant.ACCESS_TOKEN);
        setIsLogged(!!logged);
        let prof = Cookies.get(constant.USER_PROFILE);
        setProfile(prof ? JSON.parse(prof) : []);
    }, []);

    useEffect(() => {
        if (cartCountFromState !== 0) {
            setCartCount(cartCountFromState);
        } else {
            setCartCount(0);
        }

    }, [cartCountFromState]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowSize(window.innerWidth)
            let cleanedPath = removeSlashes(window.location.pathname);
            console.log(cleanedPath)

            if (cleanedPath === 'product-view' || cleanedPath === 'package-store' || cleanedPath === 'package-details') {
                setSelectedMenuItem('package-store');
            } else {
                setSelectedMenuItem(cleanedPath);
            }

            const cartData = localStorage.getItem(CART_LIST);

            if (cartData) {
                const cartItems = JSON.parse(cartData);
                setCartCount(cartItems.length);
            }
        }
    }, [typeof window !== 'undefined' && window.location.pathname]);

    const toggleContactUsModal = () => {
        setIsContactUsModalOpen(!isContactUsModalOpen);
    };

    const onClick = async (e) => {
        dispatch(setLoading(true));
        console.log('nav bar', e)

        // if ()

        setSelectedMenuItem(e.key);
        if (e.key === 'package-store') {
            router.push(`/${e.key}/raw`);
            dispatch(setLoading(false));
        } else if (e.key === 'contact') {
            dispatch(setLoading(false));
        } else {
            router.push(`/${e.key}`);
            dispatch(setLoading(false));
        }

    };

    const menuItems = [
        {label: "Home", key: "home", link: "/home"},
        {label: "Package Shop", key: "package-store", link: "/package-store"},
        {label: "Our Story", key: "our-story", link: "/our-story"},
        {label: "Track Order", key: "track-order", link: "/track-order"},
        {label: <span onClick={toggleContactUsModal}>Contact</span>, key: "contact",},
        windowSize <= 768 && {
            label: <Row className='d-flex w-100 justify-content-between'>
                <Col md={11} lg={11}> <Button type="primary" className='auth-btn success w-100  '
                                              onClick={() => window.location.href = '/signin'}>
                    Sign In
                </Button></Col>
                <Col md={11} lg={11}>
                    <Button id="signup_btn" type="button" className='auth-btn w-100'
                            onClick={() => window.location.href = "/create-account"}>Sign up
                    </Button>
                </Col>
            </Row>, key: "",
        },

    ];


    const content = (
        <div>
            <div onClick={() => {
                dispatch(setLoading(true));
                router.push(`/my-orders`)
            }} className='logout'>
                <ShoppingCart size={16}/> My Orders
            </div>
            <div onClick={() => {
                dispatch(setLoading(true));
                logout()
            }} className='logout'>
                <Power size={16}/> Logout
            </div>
        </div>
    );
    console.log(selectedMenuItem)
    return (
        <>
            <ContactUs isOpen={isContactUsModalOpen} toggleModal={toggleContactUsModal}/>
            <div id="nav_bar" style={{position: "fixed"}}>
                <div id="navbar_logo">
                    <Image onClick={() => {
                        router.push(`/`)
                    }} width={200} height={80} alt='ewe' src={Logo}/>
                </div>
                <div id="navbar_items">
                    <Menu
                        id="navbar01"
                        onClick={onClick}
                        selectedKeys={[selectedMenuItem]}
                        mode="horizontal"
                        items={menuItems}
                    />
                </div>
                <div id="navbar_btn_div" className={poppins.className}>
                    <div className='d-flex flex-row'>


                        {!isLogged ? (
                            windowSize > 769 && <>
                                <Button type="primary" className='auth-btn success mx-md-4 mx-lg-4'
                                        onClick={() => window.location.href = '/signin'}>
                                    Sign In
                                </Button>
                                <Button id="signup_btn" type="button" className='auth-btn'
                                        onClick={() => window.location.href = "/create-account"}>
                                    Sign up
                                </Button>
                            </>

                        ) : (
                            <Popover placement="bottom" title={'User Profile'} content={content}>
                                <Avatar className='userIcon-btn'
                                        style={{backgroundColor: 'rgba(255,255,255,0.6)', verticalAlign: 'center'}}
                                        size="large" icon={<User color={'#5CB919FF'}/>}/>
                            </Popover>
                        )}
                        {cartCount > 0 && (
                            <Badge style={{cursor: 'pointer'}} onClick={() => {
                                router.push(`/cart`)
                            }} color="#5CB919FF" className='mx-sm-4 mx-md-4 mx-lg-5' count={cartCount}>
                                <Avatar style={{
                                    backgroundColor: 'rgba(255,255,255,0.6)',
                                    verticalAlign: 'middle',
                                    cursor: 'pointer'
                                }} size="large" icon={<ShoppingCart size={20} color={'#5CB919FF'}/>}/>
                            </Badge>
                        )}
                        <Button className='mx-3' onClick={() => setOpenNav(!openNav)} id="toggle_menuBtn"
                                type="button">
                            <Icon icon="gg:menu" width="25" style={{margin: "0 -5px -5px -5px"}} vFlip={true}/>
                        </Button>
                    </div>

                </div>
                {openNav && (
                    <Menu
                        onClick={onClick}
                        style={{width: "100%", top: 10}}
                        id="responsive_navbar"
                        selectedKeys={[selectedMenuItem]}
                        mode="inline"
                        items={menuItems}
                    />
                )}
            </div>
        </>
    );
};

export default NavBar;
