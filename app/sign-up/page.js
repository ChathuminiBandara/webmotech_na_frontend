"use client"
import react, { useState } from 'react'
import '../../styles/forgotPassword.scss'
import { Form, } from "antd";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { poppins } from "../fonts";
import { Space, Input, Typography, Checkbox } from 'antd';
import Image from 'next/image'
import { customToastMsg, validateInputs } from '../../util/CommonFun'
import logo from '../../public/assets/logo.png'
import { isEmail, isEmpty, isPassword } from "../../util/enum";
import * as authService from '../../service/auth'
import * as constant from '../../util/constants'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()

    const [form] = Form.useForm();

    const [temp, setTemp] = useState({ email: '', password: '' }); // State to store input values

    const handleInputChange = (fieldName, value) => {
        setTemp(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const validateInputsDetails = () => {
        !validateInputs(temp.email, [isEmpty, isEmail]).isValid ? alert(validateInputs(temp.email, ['isEmpty', 'isEmail']).errorMessage) :
            !validateInputs(temp.password, [isEmpty]).isValid ? alert(validateInputs(temp.email, ['isEmpty', 'isEmail']).errorMessage) :
                login();
    }
    const login = () => {
        console.log(temp)
        authService.loginService(temp).then(res => {
            if (res.token) {
                Cookies.set(constant.ACCESS_TOKEN, res.token);
                Cookies.set(constant.REFRESH_TOKEN, res.refreshToken);
                Cookies.set(constant.Expire_time, res.tokenExpires);
                Cookies.set(constant.USER_PROFILE, res.user);
                window.location.href = '/home'
            } else {

            }
        }).catch(c => {
            console.log(c)
            customToastMsg(c.message, 0)
        })
        //loginService
    }


    return <div className={`${poppins.className}`}>
        <div className='signUp'>
            <Row className='d-flex justify-content-end'>
                <Col md={6} lg={6} xl={6}>
                    <Card className='forgot-card'>
                        <CardBody>
                            <Form form={form} layout="vertical" name="userForm">
                                <Image
                                    src={logo}
                                    width={100}
                                    height='auto'
                                    alt="Picture of the author"
                                />
                                <h1>Sign up back!</h1>
                                <p>We're glad to see you again. Login to access your account and explore what's
                                    new!"</p>


                                <Form.Item
                                    name="Username"
                                    label="Enter your email"
                                >
                                    <Input onChange={e => handleInputChange('email', e.target.value)}
                                        placeholder='Enter your email' size='large' />
                                </Form.Item>
                                <Form.Item
                                    name="Password"
                                    label="Enter your password"

                                >
                                    <Input.Password
                                        className='borderless-input'
                                        onChange={e => handleInputChange('password', e.target.value)}
                                        placeholder='Enter your username' size='large' />
                                </Form.Item>
                                <div className='mb-3 d-flex flex-row justify-content-between'>
                                    <span onClick={() => router.push('/forgot-password')} className='btn-forgot'>Forgot Password ?</span>
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
                                        <span>Don't Have an Account ? <span onClick={() => {
                                            router.push('/sign-up')
                                        }}
                                            className='text-sign-up'>Sign Up</span></span>
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