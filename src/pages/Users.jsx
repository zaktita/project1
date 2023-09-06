import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import axiosClient from "../axios_client";
import { useStateContext } from "../Contexts/ContextProvider";

const { TextArea } = Input;

function UpdateUser() {


  const { user, token, setUser, setTokenFunction } = useStateContext();
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userPassword, setUserPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUserImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log(token);

    const formData = new FormData();
    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("password", userPassword);
    formData.append("password_confirmation", passwordConfirmation);
    if (userImage) {
      formData.append("image", userImage);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axiosClient
      .post(`/user/${user.id}`, formData, config)
      .then((response) => {
        // console.log(response.data);
        setUser(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        message.success("User Updated Successfully");
      })
      .catch((error) => {
        console.log(error.response.data);
        message.error("Error Updating User");
      });
  };

  return (
    <Form
      onFinish={handleSubmit}
      layout="horizontal"
      className="d-flex align-items-start bg-white p-5 w-100"
    >
      <div className="container">
        <h3 className="mb-4">Update User</h3>
        <div className="d-flex gap-3">
          <div className="d-flex flex-column gap-3 w-50">
            <label htmlFor="userName" className="fw-bold">
              Name
            </label>
            <Input
              type="text"
              id="userName"
              value={userName}
              size="large"
              onChange={(event) => setUserName(event.target.value)}
            />

            <label htmlFor="userEmail" className="fw-bold">
              Email
            </label>
            <Input
              type="email"
              id="userEmail"
              value={userEmail}
              size="large"
              onChange={(event) => setUserEmail(event.target.value)}
            />

            <label htmlFor="userPassword" className="fw-bold">
              Password
            </label>
            <Input.Password
              id="userPassword"
              value={userPassword}
              size="large"
              onChange={(event) => setUserPassword(event.target.value)}
            />

            <label htmlFor="passwordConfirmation" className="fw-bold">
              Password Confirmation
            </label>
            <Input.Password
              id="passwordConfirmation"
              value={passwordConfirmation}
              size="large"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />

            <input
              type="file"
              name="user-image"
              id="user-image"
              onChange={handleImageUpload}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="user-preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}

            <Button type="primary" htmlType="submit" className="w-50">
              Update User
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default UpdateUser;
