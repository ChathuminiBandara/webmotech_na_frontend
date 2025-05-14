"use client"
import AuthLayout from "../../app/layouts/authLayout";
import {Card, CardBody, Button} from "reactstrap";
import '../../styles/forgotPassword.scss'
import {Form, Input} from "antd";
import {useEffect, useState} from "react";
import {Row, Col} from 'reactstrap'
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import {useRouter} from 'next/navigation'
import OtpInput from 'react-otp-input';
import * as authService from '../../service/auth';
import {validateEmail, validatePassword} from "../../util/validation";
import {customToastMsg} from "../../util/CommonFun";

const Page = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [viewStatus, setViewStatus] = useState(2)
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [resendCounter, setResendCounter] = useState(30);
    const [isResending, setIsResending] = useState(false);


    const startCountdown = () => {
        setIsResending(true);
        setResendCounter(30);
    };


    useEffect(() => {
        let countdownInterval;

        if (isResending && resendCounter > 0) {
            countdownInterval = setInterval(() => {
                setResendCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        } else if (resendCounter === 0) {
            setIsResending(false);
        }

        return () => clearInterval(countdownInterval);
    }, [isResending, resendCounter]);


    const getOtpCode = () => {
        if (validateEmail(email)) {
            let emailDetails = {
                email: email
            }
            authService.resetPasswordConfirmEmail(emailDetails).then(res => {
                console.log(res)
                setViewStatus(1)
            }).catch(c => {
                console.log(c)
                customToastMsg(c.message, 0)
            })

        } else {
            customToastMsg('Please enter a valid email address.', 0)
        }

    }
    const confirmOtpCode = () => {

        setViewStatus(2)
    }

    const resetPassword = () => {
        if (!validatePassword(newPassword)) {
            customToastMsg("Password must contain at least one number, one uppercase letter, and one symbol, and be at least 8 characters long.", 0)
        } else if (newPassword !== confirmPassword) {
            customToastMsg(
                "Your passwords do not match each other.", 0)
        } else {
            let data = {
                "password": newPassword,
                "hash": "string"
            }
            authService.changePassword(data).then(res => {

            }).catch(c => {
                customToastMsg(c.message, 0)
            })
        }
    }

    const handleResend = () => {
        startCountdown();
        setOtp('')
    }

    const handleInputChange = (name, value) => {
        setEmail(value)
    }

    return <AuthLayout>
        {viewStatus === 0 ? <div className='forgotPassword h-100'>
                <Row className='d-flex justify-content-end'>
                    <Col className=' vh-100' md={6} lg={6} xl={6}>
                        <Card className='forgot-card'>
                            <CardBody>
                                <Form layout="vertical" name="userForm">
                                    <Image
                                        src={logo}
                                        width={100}
                                        height='auto'
                                        alt="Picture of the author"
                                    />
                                    <h1>Enter your email address</h1>
                                    <p>To reset your password, please enter your email address you may have used with
                                        us.</p>
                                    <Form.Item

                                        name="email"
                                        label="Enter your email"
                                    >
                                        <Input value={email} onChange={e => handleInputChange('email', e.target.value)}
                                               placeholder='Enter your email' size='large'/>
                                    </Form.Item>

                                    <Row>
                                        <Col md={12} className=' d-flex justify-content-end'>

                                            <Button onClick={() => {
                                                getOtpCode()
                                            }} className='btn-continue'> Continues</Button>
                                        </Col>
                                    </Row>
                                    <Row className='d-flex upper-border justify-content-start'>
                                        <Col md={12} className='mt-2'>
                                            <span onClick={() => router.push('/signin')} className='btn-forgot'>Return to sign in</span>
                                        </Col>
                                    </Row>

                                </Form>
                            </CardBody>
                        </Card></Col>
                </Row>
            </div> :
            viewStatus === 1 ? <div className='confirmOTP h-100'>
                    <Row className='d-flex justify-content-end'>
                        <Col className=' vh-100' md={6} lg={6} xl={6}>
                            <Card className='forgot-card'>
                                <CardBody>
                                    <Form layout="vertical" name="userForm">
                                        <Image
                                            src={logo}
                                            width={100}
                                            height='auto'
                                            alt="Picture of the author"
                                        />
                                        <h1>Confirm your phone number</h1>
                                        <p>Enter the OTP code, that you received into your email address.</p>

                                        <OtpInput
                                            inputStyle={{width: '3rem', height: '4rem'}}

                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            renderSeparator={<span style={{width: '10px'}}></span>}
                                            renderInput={(props) => <Input {...props} />}
                                        />

                                        <Row>
                                            <Col md={12} className='mt-4 d-flex justify-content-between'>
                                                {!isResending &&
                                                    <p style={{textDecoration: "underline", cursor: "pointer"}}
                                                       onClick={handleResend}
                                                       className="text-secondary">Resend OTP</p>}
                                                {isResending && <p className='text-secondary'>Try again in <b
                                                    className="text-success">00:{resendCounter < 10 ? `0${resendCounter}` : resendCounter}</b> seconds
                                                </p>}
                                                <Button onClick={() => {
                                                    confirmOtpCode()
                                                }} className='btn-continue'> Confirm OTP</Button>
                                            </Col>
                                        </Row>
                                        <Row className='d-flex upper-border justify-content-start'>
                                            <Col md={12} className='mt-2'>
                                                <span onClick={() => router.push('/signin')} className='btn-forgot'>Return to sign in</span>
                                            </Col>
                                        </Row>

                                    </Form>
                                </CardBody>
                            </Card></Col>
                    </Row>
                </div> :
                <div className='resetPassword h-100'>
                    <Row className='d-flex justify-content-end'>
                        <Col className=' vh-100' md={6} lg={6} xl={6}>
                            <Card className='forgot-card'>
                                <CardBody>
                                    <Form layout="vertical" name="userForm">
                                        <Image
                                            src={logo}
                                            width={100}
                                            height='auto'
                                            alt="Picture of the author"
                                        />
                                        <h1>Rest your password</h1>
                                        <p>Enter your email address to receive a password reset link. Stay secure and
                                            regain access to your account easily!</p>
                                        <Form.Item

                                            name="email"
                                            label="New password"
                                        >
                                            <Input.Password className='borderless-input' value={newPassword}
                                                            onChange={e => setNewPassword(e.target.value)}
                                                            placeholder='Enter your new password' size='large'/>
                                        </Form.Item>
                                        <Form.Item

                                            name="email"
                                            label="Confirm password"
                                        >
                                            <Input.Password className='borderless-input' value={confirmPassword}
                                                            onChange={e => setConfirmPassword(e.target.value)}
                                                            placeholder='Confirm your password' size='large'/>
                                        </Form.Item>


                                        <Row>
                                            <Col md={12} className='mt-4 d-flex justify-content-end'>

                                                <Button onClick={() => {
                                                    resetPassword()
                                                }} className='btn-continue'> Reset Password</Button>
                                            </Col>
                                        </Row>
                                        <Row className='d-flex upper-border justify-content-start'>
                                            <Col md={12} className='mt-2'>
                                                <span onClick={() => router.push('/signin')} className='btn-forgot'>Return to sign in</span>
                                            </Col>
                                        </Row>

                                    </Form>
                                </CardBody>
                            </Card></Col>
                    </Row>
                </div>
        }
    </AuthLayout>
}

export default Page