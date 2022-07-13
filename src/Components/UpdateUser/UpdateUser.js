import {
  faAngleDoubleLeft,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ClinicianNav from "../Navbar/ClinicianNav";
function UpdateUser() {
  const [patientEmail, setpatientEmail] = useState("");
  const [patientFirstName, setpatientFirstName] = useState("");
  const [patientLastName, setpatientLastName] = useState("");
  const [patientContactNo, setpatientContactNo] = useState("");
  const [patientUsername, setpatientUsername] = useState("");
  const [patientPass, setpatientPass] = useState("");
  const [patientPic, setpatientPic] = useState("");
  const [imgurl, setimgurl] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const userEmail = localStorage.getItem("Update");
  console.log(userEmail);
  const token = localStorage.getItem("token");
  useEffect(() => {
    Axios.defaults.withCredentials = true;
    Axios.get(
      `https://emovault.herokuapp.com/api/users/patient?token=${token}&email=${userEmail}`,
      {
        email: userEmail,
        token: token,
      }
    )
      .then((response) => {
        setpatientEmail(response.data.patient.email);
        setpatientFirstName(response.data.patient.firstName);
        setpatientLastName(response.data.patient.lastName);
        setpatientContactNo(response.data.patient.contactNo);
        setpatientUsername(response.data.patient.username);
        setpatientPass(response.data.patient.password);
        setimgurl(response.data.patient.picture);
        console.log(response.data);
        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updatePatient = () => {
    //setIsVisible(true);
    Axios.defaults.withCredentials = false;
    const formData = new FormData();
    formData.append("file", patientPic);
    formData.append("upload_preset", "emovaultClient");
    console.log(patientPic);
    Axios.post(
      "https://api.cloudinary.com/v1_1/dlvt2lnkh/image/upload",

      formData
    )
      .then((response) => {
        console.log(response);
        console.log(response.data.secure_url);
        setimgurl(response.data.secure_url);
        Axios.defaults.withCredentials = true;
        Axios.patch(
          `https://emovault.herokuapp.com/api/users/patient?email=${userEmail}`,
          {
            firstName: patientFirstName,
            lastName: patientLastName,
            username: patientUsername,
            picture: response.data.secure_url,
            password: patientPass,
            currentEmail: userEmail,
            email: patientEmail,
            contactNo: patientContactNo,
          }
        )
          .then((response) => {
            console.log(response.data);
            console.log("nays");
            Axios.get(
              `https://emovault.herokuapp.com/api/users/patient?token=${token}`,
              {
                email: userEmail,
                token: token,
              }
            ).then((response) => {
              console.log(response.data);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  const back = () => {
    navigate("/UserManagement");
    window.location.reload();
  };
  return (
    <div>
      <ClinicianNav />
      <div
        className="updateClientBg"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="updateClientIn" style={{ padding: "50px" }}>
          <center>
            <img
              className="mb-3"
              src={window.location.origin + "/trash.svg"}
              alt="trash"
              style={{ width: 500, align: "center" }}
            />
          </center>
          <Row>
            <h2 className="fw-bold text-center mb-2">Yehey!</h2>
            <p className="text-center mb-4">Account Update Successful</p>
          </Row>

          <Row>
            <Button
              style={{
                width: "100%",
                background: "var(--dvio)",
                borderColor: "var(--dvio)",
                outline: "none",
                boxShadow: "none",
              }}
              as={Link}
              to={"/UserManagement"}
            >
              Home
            </Button>
          </Row>
        </div>
      </div>
      <div className="adduser-tb-bg">
        <div className="adduser-tb-in">
          <Form.Group>
            <Row className="mb-3">
              <Col>
                <h1 className="fw-bold">Update User</h1>
              </Col>
              <Col>
                <Form.Group className="back-cont">
                  <Form.Label
                    className="text-right mb-2 um-back-btn"
                    onClick={back}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      padding: "2%",
                      border: "none",
                    }}
                  >
                    <FontAwesomeIcon
                      id="left-arrow"
                      icon={faAngleDoubleLeft}
                    ></FontAwesomeIcon>
                    Back
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <Form>
            <Row className="mb-4">
              <Col
                style={{
                  padding: "0",
                }}
                xs="auto"
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                  id="img"
                  src={imgurl}
                />
              </Col>
              <Col style={{ margin: "auto" }}>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    setpatientPic(e.target.files[0]);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Personal Information</h2>
                <Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={patientFirstName}
                        onChange={(e) => {
                          setpatientFirstName(e.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={patientLastName}
                        onChange={(e) => {
                          setpatientLastName(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>

                  <h2>Contact Information</h2>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="tel"
                        value={patientContactNo}
                        onChange={(e) => {
                          setpatientContactNo(e.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={patientEmail}
                        onChange={(e) => {
                          setpatientEmail(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>

              <h2>Account Information</h2>
              <Row className="mb-5">
                <Col>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={patientUsername}
                    onChange={(e) => {
                      setpatientUsername(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="****"
                    onChange={(e) => {
                      setpatientPass(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Button
                style={{
                  width: "100%",
                  color: "black",
                  background: "var(--vio)",
                  border: "none",
                  marginBottom: "10px",
                }}
                onClick={updatePatient}
              >
                Create Account
              </Button>
              <Button
                style={{
                  width: "100%",
                  color: "black",
                  background: "#fff",
                  borderColor: "var(--vio)",
                }}
              >
                Cancel
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
