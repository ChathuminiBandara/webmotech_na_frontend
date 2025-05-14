"use client"
import react, {useEffect, useState} from 'react'
import '../../styles/forgotPassword.scss'
import {Form, Button, Input, ConfigProvider} from 'antd';
import {Card, CardBody, Row, Col,} from "reactstrap";
import {poppins} from "../fonts";
import Image from 'next/image'
import axios from 'axios';
import {customToastMsg} from '../../util/CommonFun'
import logo from '../../public/assets/logo/updateFullLogo.png'
import {useRouter} from 'next/navigation'
import URL_REMOTE from '../../service/apiConfig'
import {useDispatch} from "react-redux";
import {setLoading} from "../../redux/actions/loadingActions";

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
            [fieldName]: value,
        }));
    };

    const handleSignIn = async () => {
        const formData = form.getFieldsValue();

        // Exclude the upload button data
        delete formData['upload-btn'];

        // Customize the form data
        const customData = {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            contactNo: formData.contactNo,
            address: formData.address,
        };

        try {
            const response = await axios.post(URL_REMOTE.serverUrl + '/api/auth/email/register', customData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                customToastMsg('Registration successful!', 1);
                console.log('Registration successful', response.data);
                router.push('/signin');
                dispatch(setLoading(false));
            } else {
                dispatch(setLoading(false));
                customToastMsg('Registration failed!', 0);
                console.error('Registration failed', response.statusText);

            }

        } catch (error) {
            dispatch(setLoading(false));
            if (error.response.status === 422) {

                customToastMsg('Email Already Exists!', 0);
                console.log('Email Already Exists!', error.message);
                return;
            }
            dispatch(setLoading(false));
            customToastMsg('Error during registration', 0)
            console.error('Error during registration:', error);
        }
    };

    const validateInputsDetails = async () => {
        dispatch(setLoading(true));
        try {

            await form.validateFields();
            handleSignIn();

        } catch (error) {
            dispatch(setLoading(false));
            customToastMsg('Form validation failed', 0);
            console.error('Form validation failed:', error);
        }
    };

    return <div>
        <div className='createAccount h-100'>
            <Row className='d-flex justify-content-end'>
                <Col style={{marginTop: '6rem'}} className=' vh-100' md={6} lg={6} xl={6}>
                    <Card className='forgot-card mt-5'>
                        <CardBody>

                                <Form form={form} layout="vertical" name="userForm" className='user-form'>
                                <Image
                                    src={logo}
                                    width={100}
                                    height='auto'
                                    alt="Picture of the author"
                                />
                                <h1>Create Account</h1>
                                <p>Let's begin the journey together! Create your account and start exploring.</p>


                                {/* first name , last name */}
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="firstName"
                                            label="First Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your first name!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder='Enter your first name'
                                                size='large'
                                                onChange={e => handleInputChange('firstName', e.target.value)}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="lastName"
                                            label="Last Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your last name!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder='Enter your last name'
                                                size='large'
                                                onChange={e => handleInputChange('lastName', e.target.value)}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* password */}
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="password"
                                            label="Enter your password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your password!',
                                                },
                                                {
                                                    min: 6,
                                                    message: 'Password must be at least 6 characters!',
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder='Enter your password'
                                                size='large'
                                                onChange={e => handleInputChange('password', e.target.value)}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="confirm-password"
                                            label="Confirm password"
                                            rules={[
                                                {required: true, message: 'Please confirm your password!'},
                                                ({getFieldValue}) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') !== value) {
                                                            return Promise.reject('Passwords do not match!');
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder='confirm password'
                                                size='large'
                                                onChange={e => handleInputChange('con-password', e.target.value)}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* contact, email */}
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="contactNo"
                                            label="Contact Number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your contact number!',
                                                },
                                                {
                                                    pattern: /^[0-9]{10}$/, // Match exactly 10 digits
                                                    message: 'Please enter a 10-digit number.',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder='Enter your contact number'
                                                size='large'
                                                onChange={e => handleInputChange('contactNo', e.target.value)}
                                            />
                                        </Form.Item>

                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="email"
                                            label="Enter your email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your email!',
                                                },
                                                {
                                                    type: 'email',
                                                    message: 'Please enter a valid email address.',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder='Enter your email'
                                                size='large'
                                                onChange={e => handleInputChange('email', e.target.value)}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* address */}
                                <Form.Item
                                    name="address"
                                    label="Address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your address!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder='Enter your address'
                                        size='large'
                                        onChange={e => handleInputChange('address', e.target.value)}
                                    />
                                </Form.Item>

                                <Row>
                                    <Col md={12} className='d-flex justify-content-end'>
                                        <Button
                                            size='large'
                                            className='btn-create'
                                            onClick={validateInputsDetails}
                                        >
                                            Create Account
                                        </Button>
                                    </Col>
                                </Row>

                                <Row className='d-flex upper-border justify-content-start'>
                                    <Col md={12} className='mt-2'>
                                        <span>Already Have an Account ? <span
                                            onClick={() => {
                                                router.push('/signin')
                                            }}
                                            className='text-hint'>Sign in</span></span>
                                    </Col>
                                </Row>
                            </Form>

                        </CardBody>
                    </Card></Col>
                <div className='bottom-margin'></div>
            </Row>
        </div>

    </div>
}

export default Page