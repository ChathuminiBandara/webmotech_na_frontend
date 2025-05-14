import React, { useState } from "react";
import { Button, Modal, Form, Input, Row, Col } from "antd";
import { poppins } from "../..//app/fonts";
import TextArea from "antd/es/input/TextArea";
import "../../styles/ContactUs.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ isOpen, toggleModal }) => {
  const [form] = Form.useForm();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const onReset = () => {
    form.resetFields();
  };

  //   const onFinish = (values) => {
  //     console.log("Success:", values);
  //   };

  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };
  const notify = () => {
    toast("Default Notification !");

    toast.success("Thank You for Contact Us!", {
      position: toast.POSITION.TOP_CENTER,
    });

    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const sentInquiries = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      contactNo: contact,
      email: email,
      message: message,
    };

    console.log(data, "-----+++++++++++");

    axios
      .post("http://84.46.249.96:4001/api/inquiry", data)
      .then((res) => {
        console.log(res,"response");
        toast.success("Thank You for Contact Us!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onReset();
        toggleModal();
      })
      .catch((err) => {
        console.log(err,"error");
        toast.error("Somthing went Wrong!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        onReset();
        toggleModal();
      });
  };
  return (
    <>
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
      <div className={poppins.className}>
        <Modal
          style={{
            top: 20,
          }}
          title="Connect with Freshness!"
          open={isOpen}
          onOk={toggleModal}
          onCancel={toggleModal}
          footer={null}
          width={650}
        >
          <p>Reach Out to Us for Inquiries and Orders</p>
          <Form
            id="contact_form"
            name="basic"
            form={form}
            layout="vertical"
            labelCol={{
              span: 16,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
              width: "100%",
              margin: "auto",
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row>
              <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  label="First Name"
                  name="firstname"
                  style={{
                    margin: "0 8px 0 0",
                  }}
                >
                  <Input
                    size="large"
                    placeholder="Your First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  label="Last Name"
                  name="lastname"
                  style={{
                    margin: "0 0 0 8px",
                  }}
                >
                  <Input
                    size="large"
                    placeholder="Your Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Email" name="email">
              <Input
                size="large"
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Contact No" name="contact">
              <Input
                size="large"
                placeholder="Your Contact Number"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Message" name="message">
              <TextArea
                style={{ height: 100 }}
                placeholder="Your Message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={sentInquiries}>
                Send Inquiries
              </Button>
              {/* <Button htmlType="button" onClick={onReset}>
                Reset
              </Button> */}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default App;
