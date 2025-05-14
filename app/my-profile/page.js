'use client';
import CommonLayout from "@/app/layouts/commonLayout";
import '../../styles/myProfile.scss'
import {Button, Card, Col, Form, Input, Row, Upload} from "antd";
import {CardBody, Container} from "reactstrap";
import Image from "next/image";
import logo from "@/public/assets/logo/updateFullLogo.png";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setLoading} from "@/redux/actions/loadingActions";
import {customToastMsg} from "@/util/CommonFun";
import ImgCrop from 'antd-img-crop';
import {useState} from "react";

const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
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

    const handleInputChange = (fieldName, value) => {
        setTemp(prevState => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    return <CommonLayout>
        <div className='myProfile w-100'>
            <div className="profileSection w-100">
                <Container>
                    <Row className='d-flex justify-content-evenly'>
                        <Col style={{marginTop: '12rem'}} className='w-100 d-flex flex-row justify-content-center'
                             md={8} lg={8}
                             xl={8}>
                            <ImgCrop rotationSlider>
                                <Upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    multiple={false}
                                    maxCount={1}

                                >
                                    {fileList.length < 1 && '+ Upload'}
                                </Upload>
                            </ImgCrop>

                            <small>Update your profile Image </small>
                        </Col>
                        <Col style={{marginTop: '5rem'}} md={14} lg={14} xl={14}>
                            <Card className='profile-card mt-5'>
                                <CardBody>
                                    <Form form={form} layout="vertical" name="userForm" className='user-form'>

                                        <h1>My Profile</h1>
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
                                                    label="confirm password"
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
                                            <Col md={24} className='d-flex justify-content-end'>
                                                <Button
                                                    size='large'
                                                    className='btn-create'
                                                    onClick={validateInputsDetails}
                                                >
                                                    Update Account Details
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Form>

                                </CardBody>
                            </Card></Col>
                    </Row>
                </Container></div>
        </div>
    </CommonLayout>
}

export default Page