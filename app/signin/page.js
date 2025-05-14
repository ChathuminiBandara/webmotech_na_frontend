"use client"
import react, {useEffect, useState} from 'react'
import '../../styles/forgotPassword.scss'
import {Form,} from "antd";
import {Card, CardBody, Row, Col, Button} from "reactstrap";
import {poppins} from "../fonts";
import {Space, Input, Typography, Checkbox} from 'antd';
import Image from 'next/image'
import {customToastMsg, validateInputs} from '../../util/CommonFun'
import logo from '../../public/assets/logo/updateFullLogo.png'
import {isEmail, isEmpty, isPassword} from "../../util/enum";
import * as authService from '../../service/auth'
import * as constant from '../../util/constants'
import Cookies from "js-cookie";
import {useRouter} from 'next/navigation'
import {setLoading} from "../../redux/actions/loadingActions";
import {useDispatch} from "react-redux";

const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const [temp, setTemp] = useState({email: '', password: ''}); // State to store input values

    useEffect(() => {
        dispatch(setLoading(false));
    }, []);

    const handleInputChange = (fieldName, value) => {
        setTemp(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const validateInputsDetails = () => {
        !validateInputs(temp.email, [isEmpty, isEmail]).isValid ? customToastMsg(validateInputs(temp.email, ['isEmpty', 'isEmail']).errorMessage,0) :
            !validateInputs(temp.password, [isEmpty]).isValid ? customToastMsg(validateInputs(temp.email, ['isEmpty', 'isEmail']).errorMessage,0) :
                login();
    }
    const login = () => {
        dispatch(setLoading(true));
        authService.loginService(temp).then(res => {
            console.log(res)
            if (res.data.token) {
                Cookies.set(constant.ACCESS_TOKEN, res.data.token);
                Cookies.set(constant.REFRESH_TOKEN, res.data.refreshToken);
                Cookies.set(constant.Expire_time, res.data.tokenExpires);
                Cookies.set(constant.USER_PROFILE, JSON.stringify(res.data.user));
                window.location.href = '/home';
            }
        }).catch(c => {
            dispatch(setLoading(false));
            customToastMsg(c.message, 0)
        })
    }


    return <div className={`${poppins.className}`}>
        <div className='loginAuth h-100'>
            <Row className='d-flex justify-content-end'>
                <Col className=' vh-100' md={6} lg={6} xl={6}>
                    <Card className='forgot-card'>
                        <CardBody>
                            <Form form={form} layout="vertical" name="userForm">
                                <Image
                                    src={logo}
                                    width={100}
                                    height='auto'
                                    alt="Picture of the author"
                                />
                                <h1>Welcome back!</h1>
                                <p>We're glad to see you again. Login to access your account and explore what's
                                    new!"</p>


                                <Form.Item
                                    name="Username"
                                    label="Enter your email"
                                >
                                    <Input onChange={e => handleInputChange('email', e.target.value)}
                                           placeholder='Enter your email' size='large'/>
                                </Form.Item>
                                <Form.Item
                                    name="Password"
                                    label="Enter your password"

                                >
                                    <Input.Password
                                        className='borderless-input'
                                        onChange={e => handleInputChange('password', e.target.value)}
                                        placeholder='Enter your username' size='large'/>
                                </Form.Item>
                                <div className='mb-3 d-flex flex-row justify-content-between'>
                                    <span onClick={() => {
                                        dispatch(setLoading(true));
                                        router.push('/request-reset-password')
                                    }} className='btn-forgot'>Forgot Password ?</span>
                                    <span> </span>
                                </div>


                                <Row>
                                    <Col md={12} className=' d-flex justify-content-end'>
                                        <Button size='large' className='btn-signin' onClick={validateInputsDetails}>Sign
                                            In</Button>
                                    </Col>
                                </Row>
                                <Row className='d-flex upper-border justify-content-start'>
                                    <Col md={12} className='mt-2'>
                                        <span>Don't Have an Account ? <span
                                            onClick={() => {
                                                dispatch(setLoading(true));
                                                router.push('/create-account')
                                            }}
                                            className='text-hint'>Sign Up</span></span>
                                    </Col>
                                </Row>

                            </Form>
                        </CardBody>
                    </Card></Col>
            </Row>
        </div>

    </div>
}

export default Page