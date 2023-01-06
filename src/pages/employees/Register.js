import { Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import "./register.css"

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("https://crm-backend-yrar.onrender.com/employee/register", values);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  return (
    <div className="registercontainer">
      <Form  onFinish={onFinish}>
        <h1 className="text-medium"><b>SCHOOL RESULTS</b></h1>
        <hr />
        <h1 className="text-medium">Employee - Registration</h1>
        <hr />
        <label >Name</label>
        <Form.Item name="name" >
          <Input />
        </Form.Item>
        <label >Employee Id</label>
        <Form.Item name="employeeId" >
          <Input />
        </Form.Item>
        <label >Password</label>
        <Form.Item name="password" >
          <Input type="password" />
        </Form.Item>
        <label >ConfirmPassword</label>
        <Form.Item name="confirmPassword" >
          <Input type="password" />
        </Form.Item>
        <button className="primary text-white px-5 my-2 w-100">REGISTER</button>
        <Link to="/login" className=" text-mini">
          Already Registered , Click Here To Login
        </Link>
      </Form>
    </div>
  );
}

export default Register;
