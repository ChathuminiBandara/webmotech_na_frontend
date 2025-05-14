import { Modal, Steps, Button, theme, message, Form, Input } from "antd";
import React, { useState } from "react";
import "../../styles/CheckLocation.scss";
const CheckLocation = ({ isOpen, toggleModal }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const [homeNo, setHomeNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const steps = [
    {
      title: "Address",
      content: (
        <div>
          <Form
            id="address_form"
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
            autoComplete="off"
          >
            <Form.Item label="Home Number" name="homeNo">
              <Input
                size="large"
                placeholder="home no:"
                value={homeNo}
                onChange={(e) => {
                  setHomeNo(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Street Name" name="streetName">
              <Input
                size="large"
                placeholder="street name"
                value={streetName}
                onChange={(e) => {
                  setStreetName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input
                size="large"
                placeholder="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Check Availability",
      content: (
        <div id="check_availability_div">
          <div id="availability_label">
            <h4>You are in eligible location area</h4>
          </div>
          <div id="location_map">

          </div>
        </div>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div>
      <Modal
        style={{
          top: 20,
        }}
        title="To ensure a swift delivery, please provide your current location."
        open={isOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={null}
        width={650}
      >
        <div id="cl_stepper_cnt">
          <Steps
            id="cl_stepper"
            current={current}
            items={items}
            onChange={onChange}
          />
          <div id="cl_content">{steps[current].content}</div>
          <div id="cl_btn_div">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Check Location
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Select Your Package
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckLocation;
