import {
  faMagnifyingGlass,
  faArrowUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  InputGroup,
  FormControl,
  Table,
  Image,
} from "react-bootstrap";
import EmoNavbar from "../Navbar/EmoNavbar";
import { Link } from "react-router-dom";
import Axios from "axios";
import Moment from "react-moment";

function ClinicianList() {
  Axios.defaults.withCredentials = true;
  const [clinicianList, setClinicianList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5001/api/users/getclinicians")
      .then((response) => {
        setClinicianList(response.data.clinicians);
        console.log(response.data.clinicians);
        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const view = (email, firstName, lastName) => {
    const clinician = {
      name: firstName + " " + lastName,
      email: email,
    };

    localStorage.setItem("Clinician", JSON.stringify(clinician));
  };

  const searchClinician = () => {
    var input,
      filter,
      table,
      tr,
      td,
      td1,
      td2,
      i,
      txtValue,
      txtValue1,
      txtValue2;
    input = document.getElementById("searchinput");
    filter = input.value.toUpperCase();
    table = document.getElementById("clinicianList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      td1 = tr[i].getElementsByTagName("td")[0];
      td2 = tr[i].getElementsByTagName("td")[2];
      if (td || td1) {
        txtValue = td.textContent || td.innerText;
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        if (
          txtValue.toUpperCase().indexOf(filter) > -1 ||
          txtValue1.toUpperCase().indexOf(filter) > -1 ||
          txtValue2.toUpperCase().indexOf(filter) > -1
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  return (
    <>
      <EmoNavbar />
      <div className="clinicians-tb-bg">
        <div className="clinicians-tb-in">
          <Form.Group>
            <Row>
              <Col>
                <h1 className="fw-bold">List of Clinician</h1>
              </Col>
              <Col>
                <Form.Group className="back-cont">
                  <Form.Label
                    className="text-right mb-2 cl-add-btn"
                    as={Link}
                    to="/CreateAccount"
                    style={{ color: "black", border: "none", padding: "2%" }}
                  >
                    <FontAwesomeIcon
                      id="left-arrow"
                      icon={faPlus}
                    ></FontAwesomeIcon>
                    Add New
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <h4>Below shows the list of clinician</h4>
          </Form.Group>
          <Row className="mb-4" style={{ width: "50%" }}>
            <Col id="g">
              <InputGroup className="mb-3">
                <InputGroup.Text id="icon-cont">
                  <FontAwesomeIcon
                    className="searchicon"
                    icon={faMagnifyingGlass}
                  ></FontAwesomeIcon>
                </InputGroup.Text>
                <FormControl placeholder="Search" id="searchinput" />
              </InputGroup>
            </Col>
            <Col>
              <Button
                id="cl-search-btn"
                style={{ color: "black", border: "none" }}
                onClick={searchClinician}
              >
                Search
              </Button>
            </Col>
          </Row>
          <Table className="text-center" responsive="sm" id="clinicianList">
            <thead>
              <tr>
                <th>Image</th>
                <th>
                  First Name {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dyellow)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>
                  Last Name {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dyellow)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>
                  Experience {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dyellow)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>
                  Added Date {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dyellow)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>Action {""}</th>
              </tr>
            </thead>
            <tbody>
              {clinicianList.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className="align-middle">
                      <Image
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        src={val.picture}
                      />
                    </td>
                    <td className="align-middle">{val.firstName}</td>
                    <td className="align-middle">{val.lastName}</td>
                    <td className="align-middle">{val.yearsInPractice}</td>
                    <td className="align-middle">
                      <Moment format="MM/DD/YYYY">{val.dateAdded}</Moment>
                    </td>
                    <td className="align-middle">
                      <Button
                        as={Link}
                        to={"/ListClients"}
                        style={{
                          backgroundColor: "var(--yellow)",
                          color: "black",
                          border: "none",
                          width: "100px",
                          outline: "none",
                          boxShadow: "none",
                        }}
                        className="tableBtn-view"
                        onClick={() => {
                          view(val.email, val.firstName, val.lastName);
                        }}
                      >
                        View
                      </Button>

                      <Button
                        style={{
                          backgroundColor: "var(--pink)",
                          color: "black",
                          border: "none",
                          width: "100px",
                          outline: "none",
                          boxShadow: "none",
                        }}
                        className="tableBtn-pdf"
                      >
                        PDF
                      </Button>

                      <Button
                        style={{
                          backgroundColor: "var(--green)",
                          color: "black",
                          border: "none",
                          width: "100px",
                          outline: "none",
                          boxShadow: "none",
                        }}
                        className="tableBtn-excel"
                      >
                        Excel
                      </Button>

                      <Button
                        style={{
                          backgroundColor: "var(--blue)",
                          color: "black",
                          border: "none",
                          width: "100px",
                          outline: "none",
                          boxShadow: "none",
                        }}
                        className="tableBtn-print"
                      >
                        PRINT
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default ClinicianList;
