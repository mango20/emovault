import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  faAngleDoubleLeft,
  faLock,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ClientNav() {
  const [name, setName] = useState([]);
  const [img, setImg] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5001/api/auth/getinfo").then((response) => {
      console.log(response);
      setName(response.data.user.firstName);
      setImg(response.data.user.picture);
    });
  }, []);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="navUser">
        <Container fluid>
          <Navbar.Brand className="fw-bold" style={{ color: "var(--dblue" }}>
            <img
              alt=""
              src={process.env.PUBLIC_URL + "/client.png"}
              width="50"
              height="50"
              style={{ paddingRight: "5px" }}
              className="d-inline-block align-center"
            />
            EMOVAULT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/DatePick"
                style={{ fontWeight: "bold", color: "black" }}
              >
                Home
              </Nav.Link>
            </Nav>
            <Nav>
              <img
                id="avatar"
                src={img}
                alt=""
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />

              <NavDropdown
                title={name}
                align="end"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to={"/Profile"}>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px" }}
                    icon={faUser}
                  ></FontAwesomeIcon>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/ChangePassword"}>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px" }}
                    icon={faLock}
                  ></FontAwesomeIcon>
                  Change Password
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item style={{ color: "red" }} as={Link} to={"/"}>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px" }}
                    icon={faArrowRightFromBracket}
                  ></FontAwesomeIcon>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default ClientNav;
