"use client"
import React, {useEffect, useState} from 'react'
import '../../styles/forgotPassword.scss'
import {Form, Input,} from "antd";
import {Button, Card, CardBody, Col, Row} from "reactstrap";
import {poppins} from "../fonts";
import Image from 'next/image'
import {customToastMsg, handleError} from '../../util/CommonFun'
import logo from '../../public/assets/logo/updateFullLogo.png'
import {resetPasswordConfirmEmail, resetPasswordWithHashCode, verifyOtpCodeWithEmail} from '../../service/auth'
import {useRouter} from 'next/navigation'
import {setLoading} from "../../redux/actions/loadingActions";
import {useDispatch} from "react-redux";
import {validateEmail, validatePassword} from "@/util/validation";
import {ToastContainer} from "react-toastify";
import OtpInput from "react-otp-input";

const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const [email, setEmail] = useState('')
    const [hashCode, setHashCode] = useState('')
    const [stepNumber, setStepNumber] = useState(0)
    const [otp, setOtp] = useState('')
    const [otpDetails, setOtpDetails] = useState('')
    const [isResending, setIsResending] = useState(false);
    const [resendCounter, setResendCounter] = useState(30);
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const startCountdown = () => {
        setIsResending(true);
        setResendCounter(30);
    };


    const handleResend = () => {
        startCountdown();
        setOtpDetails('')
    }

    const handleInputChange = (fieldName, value) => {
        setEmail(value)
    };

    const validateInputsDetails = () => {
        !validateEmail(email) ? customToastMsg('Enter valid email address') :
            sendEmail();
    }

    const sendEmail = () => {
        let data = {
            email: email
        }
        dispatch(setLoading(true));
        resetPasswordConfirmEmail(data).then(res => {
            setStepNumber(1)
            setOtpDetails('')
            //setHashCode(res?.data?.hash)
            customToastMsg(res.message, 1)
        }).catch(c => {
            console.log(c)
            handleError(c)
        }).finally(f => {
            dispatch(setLoading(false));
        })
    }

    useEffect(() => {
        dispatch(setLoading(false));
    }, [stepNumber]);

    const confirmOtpCode = () => {
        dispatch(setLoading(true));
        console.log(otp, otpDetails)
        let temp = {
            otp: otpDetails,
            email: email
        }
        verifyOtpCodeWithEmail(temp).then(res => {
            setStepNumber(2);
            setHashCode(res?.data?.hash)
            dispatch(setLoading(false));
            customToastMsg('Otp verified', 1)
        }).catch(c => {
            dispatch(setLoading(false));
            handleError(c)
        })

    }

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


    const resetPassword = () => {

        newPassword === '' ? customToastMsg('Password cannot be empty', 0) :
            !validatePassword(newPassword) ? customToastMsg('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.', 0) :
                confirmPassword === '' ? customToastMsg('Confirm Password cannot be empty', 0) :
                    confirmPassword !== newPassword ? customToastMsg('Password does not match', 0) :
                        resetPasswordWithHash();


    }

    const resetPasswordWithHash = () => {
        dispatch(setLoading(true));

        let temp = {
            hash: hashCode,
            password: newPassword,

        }
        resetPasswordWithHashCode(temp).then(res => {
            customToastMsg('Your password reset successfully', 1)
            window.location.href = '/signin'


        }).catch(c => {
            dispatch(setLoading(false));
            handleError(c)

        })
    }

    console.log(stepNumber)
    return <div className={`${poppins.className}`}>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            limit={5}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <div className='resetPassword h-100'>
            <Row className='d-flex justify-content-end'>
                <Col className=' vh-100' md={6} lg={6} xl={6}>
                    {stepNumber === 0 ?
                        <Card className='forgot-card'>
                            <CardBody>
                                <Form form={form} layout="vertical" name="userForm">
                                    <Image
                                        src={logo}
                                        width={100}
                                        height='auto'
                                        alt="Picture of the author"
                                    />
                                    <h1>Reset Password</h1>
                                    <p>Enter the email address you used to register with.</p>


                                    <Form.Item
                                        name="Username"
                                        label="Enter your email"
                                    >
                                        <Input onChange={e => handleInputChange('email', e.target.value)}
                                               placeholder='Enter your email' size='large'/>
                                    </Form.Item>

                                    <Row>
                                        <Col md={12} className=' d-flex justify-content-end'>
                                            <Button size='large' className='btn-forgot-new'
                                                    onClick={validateInputsDetails}>Confirm
                                                email</Button>
                                        </Col>
                                    </Row>
                                    <Row className='d-flex upper-border justify-content-start'>
                                        <Col md={12} className='mt-2'>
                                        <span>No need of password reset ? <span
                                            onClick={() => {
                                                dispatch(setLoading(true));
                                                router.push('/signin')
                                            }}
                                            className='text-hint'>Try to Sign-in</span></span>
                                        </Col>
                                    </Row>

                                </Form>
                            </CardBody>
                        </Card> :
                        stepNumber === 1 ? <Card className='forgot-card'>
                                <CardBody>
                                    <Form form={form} layout="vertical" name="userForm">
                                        <Image
                                            src={logo}
                                            width={100}
                                            height='auto'
                                            alt="Picture of the author"
                                        />
                                        <h1>Verify you OTP code </h1>
                                        <p>Please enter the OTP code that you received in your email.</p>


                                        <Form.Item
                                            name="UserOtp"
                                            label="Enter your otp"
                                        >
                                            <OtpInput
                                                inputStyle={{width: '3rem', height: '4rem'}}
                                                inputType={"number"}
                                                onChange={(e) => {
                                                    setOtpDetails(e)
                                                    console.log(e)
                                                }}
                                                numInputs={6}
                                                renderSeparator={<span style={{width: '10px'}}></span>}
                                                renderInput={(props) => <Input {...props} />}
                                            />
                                        </Form.Item>

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
                                        <span>No need of password reset ? <span
                                            onClick={() => {
                                                dispatch(setLoading(true));
                                                router.push('/signin')
                                            }}
                                            className='text-hint'>Try to Sign-in</span></span>
                                            </Col>
                                        </Row>

                                    </Form>
                                </CardBody>
                            </Card> :
                            stepNumber === 2 ? <Card className='forgot-card'>
                                    <CardBody>
                                        <Form form={form} layout="vertical" name="userForm">
                                            <Image
                                                src={logo}
                                                width={100}
                                                height='auto'
                                                alt="Picture of the author"
                                            />
                                            <h1>Set new password </h1>
                                            <p>Must be at least 8 characters.</p>


                                            <Form.Item

                                                name="n-password"
                                                label="New password"
                                            >
                                                <Input.Password className='borderless-input' value={newPassword}
                                                                onChange={e => setNewPassword(e.target.value)}
                                                                placeholder='Enter your new password' size='large'/>
                                            </Form.Item>
                                            <Form.Item

                                                name="c-password"
                                                label="Confirm password"
                                            >
                                                <Input.Password className='borderless-input' value={confirmPassword}
                                                                onChange={e => setConfirmPassword(e.target.value)}
                                                                placeholder='Confirm your password' size='large'/>
                                            </Form.Item>


                                            <Row>
                                                <Col md={12} className='mt-4 d-flex justify-content-between'>

                                                    <Button onClick={() => {
                                                        resetPassword()
                                                    }} className='btn-continue'>Reset Password</Button>
                                                </Col>
                                            </Row>
                                            <Row className='d-flex upper-border justify-content-start'>
                                                <Col md={12} className='mt-2'>
                                        <span>No need of password reset ? <span
                                            onClick={() => {
                                                dispatch(setLoading(true));
                                                router.push('/signin')
                                            }}
                                            className='text-hint'>Try to Sign-in</span></span>
                                                </Col>
                                            </Row>

                                        </Form>
                                    </CardBody>
                                </Card> :
                                <div></div>}

                </Col>
            </Row>
        </div>
    </div>
}

export default Page